import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import {
  rateLimit,
  getClientIP,
  sanitize,
  checkRequestSize,
  isHoneypotTriggered,
} from "@/lib/security";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@dateksys.com";

export async function POST(request: Request) {
  try {
    // ✅ Request size check (10KB max)
    if (!checkRequestSize(request, 10_000)) {
      return NextResponse.json(
        { error: "Request too large" },
        { status: 413 }
      );
    }

    // Rate limiting
    const ip = getClientIP(request);
    const limiter = rateLimit(ip);

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // ✅ Honeypot check
    if (isHoneypotTriggered(body)) {
      // بنرجّع 200 عشان الـ bot يفكر إنه نجح
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // Validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // ✅ Fixed: sanitize أولاً، بعدين أي تحويلات
    const data = {
      name: sanitize(result.data.name),
      email: sanitize(result.data.email),
      phone: result.data.phone ? sanitize(result.data.phone) : undefined,
      subject: sanitize(result.data.subject),
      message: sanitize(result.data.message),
    };

    // ✅ Fixed: message newlines بعد الـ sanitize
    const htmlMessage = data.message.replace(/\n/g, "<br>");

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `DatekSys Contact <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
        to: [CONTACT_EMAIL],
        replyTo: data.email,
        subject: `New Contact: ${data.subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#050508;color:#fff;border-radius:12px;">
            <h2 style="color:#0ea5e9;margin:0 0 24px;">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#0ea5e9;">${data.email}</a></td></tr>
              ${data.phone ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Phone</td><td style="padding:8px 0;">${data.phone}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Subject</td><td style="padding:8px 0;font-weight:600;">${data.subject}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
              <p style="margin:0;line-height:1.7;">${htmlMessage}</p>
            </div>
          </div>
        `,
      });
    } else {
      console.log("📧 Contact form submission (RESEND_API_KEY not set):", data);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}