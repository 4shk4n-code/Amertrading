import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAlerts } from "@/lib/alerts/store";

export const revalidate = 0;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const dbAlerts = await prisma.adminAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const serialized = dbAlerts.map((alert) => ({
    id: alert.id,
    title: alert.title,
    type: alert.type,
    event: alert.event,
    locale: alert.locale,
    timestamp: alert.createdAt.toISOString(),
    url: alert.url ?? undefined,
    channels: alert.channels.split(",").filter(Boolean) as Array<
      "telegram" | "email" | "slack"
    >,
  }));

  const memoryAlerts = getAlerts().map((alert) => ({
    id: alert.id,
    title: alert.title,
    type: alert.type,
    event: alert.event,
    locale: alert.locale,
    timestamp: alert.timestamp,
    url: alert.url,
    channels: alert.channels,
  }));

  const merged = [...memoryAlerts, ...serialized]
    .reduce<typeof serialized>((acc, alert) => {
      if (!acc.find((a) => a.id === alert.id)) {
        acc.push(alert);
      }
      return acc;
    }, [])
    .slice(0, 10);

  return NextResponse.json({ alerts: merged });
}

