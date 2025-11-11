declare module "nodemailer" {
  export interface Transporter {
    sendMail: (...args: any[]) => Promise<any>;
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

