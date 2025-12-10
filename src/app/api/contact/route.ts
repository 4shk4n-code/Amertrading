import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/alerts/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, locale } = body as {
      name: string;
      email: string;
      message: string;
      locale?: string;
    };

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Locale:</strong> ${locale ?? "en"}</p>
      <p>${message}</p>
    `;

    // Try to save to database (non-blocking)
    try {
      if (process.env.DATABASE_URL) {
        await prisma.contactMessage.create({
          data: {
            name,
            email,
            message,
            locale: locale ?? "en",
          },
        });
      }
    } catch (dbError) {
      // Log only in development, continue execution
      // Prisma might not be initialized - that's okay, we'll just skip DB save
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving contact message to database:", dbError);
      }
    }

    // Try to send email (non-blocking)
    try {
      await sendEmail(`Contact Form: ${name}`, html);
    } catch (emailError) {
      // Log only in development, but still return success
      if (process.env.NODE_ENV === "development") {
        console.error("Error sending email:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle JSON parsing errors or other unexpected errors
    if (process.env.NODE_ENV === "development") {
      console.error("Error processing contact form:", error);
    }
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

