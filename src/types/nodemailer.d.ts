declare module "nodemailer" {
  export interface MailOptions {
    from?: string;
    to: string | string[];
    subject?: string;
    text?: string;
    html?: string;
  }

  export interface SendMailResult {
    messageId: string;
    accepted: string[];
    rejected: string[];
  }

  export interface Transporter {
    sendMail: (options: MailOptions) => Promise<SendMailResult>;
  }

  export interface CreateTransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: { user: string; pass: string };
  }

  export function createTransport(
    options: CreateTransportOptions,
  ): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}

