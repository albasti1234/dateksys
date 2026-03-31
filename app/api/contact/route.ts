import { NextResponse } from "next/server";
import {
  rateLimit,
  getClientIP,
  sanitize,
  isHoneypotTriggered,
} from "@/lib/security";


const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@dateksys.com";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    const limiter = rateLimit(ip);

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Extract text fields
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const phone = formData.get("phone") as string | null;
    const reason = formData.get("reason") as string | null;
    const subject = formData.get("subject") as string | null;
    const message = formData.get("message") as string | null;
    const honeypot = formData.get("honeypot") as string | null;

    // Honeypot check
    if (isHoneypotTriggered({ honeypot })) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // Basic validation
    if (!name || name.length < 2 || !email || !subject || subject.length < 2 || !message || message.length < 10 || !reason) {
      return NextResponse.json(
        { error: "Invalid data. Please fill in all required fields." },
        { status: 400 }
      );
    }

    const data = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : undefined,
      reason: sanitize(reason),
      subject: sanitize(subject),
      message: sanitize(message),
    };

    const htmlMessage = data.message.replace(/\n/g, "<br>");

    // Handle file attachment
    const file = formData.get("attachment") as File | null;
    let attachmentData: { filename: string; content: Buffer }[] = [];

    if (file && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. PDF, DOC, DOCX only." },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Max 5MB." },
          { status: 400 }
        );
      }
      const bytes = await file.arrayBuffer();
      attachmentData = [{ filename: file.name, content: Buffer.from(bytes) }];
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

      const result = await resend.emails.send({
        from: `DatekSys <${fromEmail}>`,
        to: [CONTACT_EMAIL],
        replyTo: data.email,
        subject: `[${data.reason}] ${data.subject}`,
        attachments: attachmentData,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#050508;color:#fff;border-radius:12px;">
            <h2 style="color:#0ea5e9;margin:0 0 24px;">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#0ea5e9;">${data.email}</a></td></tr>
              ${data.phone ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Phone</td><td style="padding:8px 0;">${data.phone}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Reason</td><td style="padding:8px 0;">${data.reason}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Subject</td><td style="padding:8px 0;font-weight:600;">${data.subject}</td></tr>
              ${attachmentData.length > 0 ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Attachment</td><td style="padding:8px 0;">📎 ${attachmentData[0].filename}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
              <p style="margin:0;line-height:1.7;">${htmlMessage}</p>
            </div>
          </div>
        `,
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        return NextResponse.json(
          { error: `Email failed: ${result.error.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    } else {
      console.log("📧 RESEND_API_KEY not set. Data:", data);
      return NextResponse.json(
        { error: "Email service not configured (RESEND_API_KEY missing)" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
