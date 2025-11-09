const useResend = !!process.env.RESEND_API_KEY;

export async function sendEmail(subject: string, html: string) {
  const from = process.env.ALERTS_FROM_EMAIL!;
  const to = process.env.ALERTS_TO_EMAIL!;
  if (!from || !to) return;

  if (useResend) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({ from, to, subject, html });
    return;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  await transporter.sendMail({ from, to, subject, html });
}

