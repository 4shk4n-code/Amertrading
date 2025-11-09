import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/alerts/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { name, email, message, locale } = (await request.json()) as {
    name: string;
    email: string;
    message: string;
    locale?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Locale:</strong> ${locale ?? "en"}</p>
    <p>${message}</p>
  `;

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
      locale: locale ?? "en",
    },
  });

  await sendEmail(`Contact Form: ${name}`, html);

  return NextResponse.json({ success: true });
}

