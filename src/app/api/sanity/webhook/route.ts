import { NextRequest, NextResponse } from "next/server";
import { verifySanitySignature } from "@/lib/security/sanity";
import { sendTelegram } from "@/lib/alerts/telegram";
import { sendEmail } from "@/lib/alerts/email";
import { sendSlack } from "@/lib/alerts/slack";
import { formatTimestamp } from "@/lib/utils/date";
import { pushAlert } from "@/lib/alerts/store";
import { prisma } from "@/lib/prisma";

const processedEvents = new Set<string>();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Missing SANITY_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const signature =
    request.headers.get("X-Sanity-Signature") ??
    request.headers.get("x-sanity-signature");
  const payload = await request.text();

  const valid = verifySanitySignature(payload, signature, secret);
  if (!valid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const body = JSON.parse(payload) as {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    name?: string;
    title?: string;
    slug?: { current: string };
    locale?: string;
    _eventType?: string;
  };

  const eventKey = `${body._id}:${body._updatedAt}`;
  if (processedEvents.has(eventKey)) {
    return NextResponse.json({ success: true, duplicate: true });
  }
  processedEvents.add(eventKey);
  if (processedEvents.size > 100) {
    const first = processedEvents.values().next().value;
    processedEvents.delete(first);
  }

  const event = body._eventType ?? "update";
  const title = body.title ?? body.name ?? body._type;
  const locale = body.locale ?? "en";
  const documentUrl = buildStudioUrl(body._type, body._id);

  const html = `
    <h2>Sanity CMS ${event.toUpperCase()}</h2>
    <p><strong>Type:</strong> ${body._type}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Locale:</strong> ${locale}</p>
    <p><strong>Updated:</strong> ${formatTimestamp(body._updatedAt)}</p>
    <p><a href="${documentUrl}">View in Studio</a></p>
  `;

  const message = [
    `📢 <b>CMS ${event.toUpperCase()}</b>`,
    `<b>Type:</b> ${body._type}`,
    `<b>Title:</b> ${title}`,
    `<b>Locale:</b> ${locale}`,
    `<b>Updated:</b> ${formatTimestamp(body._updatedAt)}`,
    documentUrl,
  ].join("\n");

  const [telegramResult, emailResult, slackResult] = await Promise.allSettled([
    sendTelegram(message),
    sendEmail(`CMS ${event.toUpperCase()}: ${title}`, html),
    sendSlack({
      title,
      type: body._type,
      event,
      url: documentUrl,
      locale,
    }),
  ]);

  const channels: Array<"telegram" | "email" | "slack"> = [];
  if (telegramResult.status === "fulfilled") channels.push("telegram");
  if (emailResult.status === "fulfilled") channels.push("email");
  if (slackResult.status === "fulfilled") channels.push("slack");

  pushAlert({
    id: eventKey,
    title,
    type: body._type,
    event,
    locale,
    timestamp: body._updatedAt,
    channels,
    url: documentUrl,
  });

  await prisma.adminAlert.upsert({
    where: { id: eventKey },
    update: {
      title,
      type: body._type,
      event,
      locale,
      channels: channels.join(","),
      url: documentUrl,
    },
    create: {
      id: eventKey,
      title,
      type: body._type,
      event,
      locale,
      channels: channels.join(","),
      url: documentUrl,
    },
  });

  return NextResponse.json({ success: true, channels });
}

function buildStudioUrl(docType: string, docId: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base}/studio/desk/${docType};${docId}`;
}

