export async function sendSlack(payload: {
  title: string;
  type: string;
  event: string;
  url: string;
  locale?: string;
}) {
  const hook = process.env.SLACK_WEBHOOK_URL;
  if (!hook) return;

  const color =
    payload.event === "create"
      ? "#2ecc71"
      : payload.event === "update"
      ? "#f1c40f"
      : "#e74c3c";

  const blocks = [
    {
      type: "header" as const,
      text: {
        type: "plain_text" as const,
        text: `📢 CMS ${payload.event.toUpperCase()} — ${payload.title}`,
      },
    },
    {
      type: "section" as const,
      fields: [
        { type: "mrkdwn" as const, text: `*Type:*\n${payload.type}` },
        {
          type: "mrkdwn" as const,
          text: `*Locale:*\n${payload.locale || "en"}`,
        },
      ],
    },
    {
      type: "section" as const,
      text: {
        type: "mrkdwn" as const,
        text: `<${payload.url}|View Document>`,
      },
    },
    { type: "divider" as const },
  ];

  await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attachments: [{ color, blocks }],
    }),
  });
}

