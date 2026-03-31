import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";
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
    // ✅ Request size check
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
      return NextResponse.json(
        { success: true, message: "Quote request received" },
        { status: 200 }
      );
    }

    // Validation
    const result = quoteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.issues },
        { status: 400 }
      );
    }

    const data = {
      contactName: sanitize(result.data.contactName),
      contactEmail: sanitize(result.data.contactEmail),
      contactPhone: result.data.contactPhone ? sanitize(result.data.contactPhone) : undefined,
      companyName: sanitize(result.data.companyName),
      serviceType: result.data.serviceType,
      budgetRange: result.data.budgetRange || undefined,
      timeline: result.data.timeline || undefined,
      projectScope: sanitize(result.data.projectScope),
      details: result.data.details ? sanitize(result.data.details) : undefined,
    };

    const htmlScope = data.projectScope.replace(/\n/g, "<br>");
    const htmlDetails = data.details ? data.details.replace(/\n/g, "<br>") : "";

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `DatekSys Quotes <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
        to: [CONTACT_EMAIL],
        replyTo: data.contactEmail,
        subject: `Quote Request — ${data.companyName} (${data.serviceType})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#050508;color:#fff;border-radius:12px;">
            <h2 style="color:#0ea5e9;margin:0 0 24px;">New Quote Request</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.contactName}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Email</td><td style="padding:8px 0;"><a href="mailto:${data.contactEmail}" style="color:#0ea5e9;">${data.contactEmail}</a></td></tr>
              ${data.contactPhone ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Phone</td><td style="padding:8px 0;">${data.contactPhone}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Company</td><td style="padding:8px 0;font-weight:600;">${data.companyName}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Service</td><td style="padding:8px 0;">${data.serviceType}</td></tr>
              ${data.budgetRange ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Budget</td><td style="padding:8px 0;">${data.budgetRange}</td></tr>` : ""}
              ${data.timeline ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Timeline</td><td style="padding:8px 0;">${data.timeline}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">Project Scope</p>
              <p style="margin:0;line-height:1.7;">${htmlScope}</p>
            </div>
            ${htmlDetails ? `
            <div style="margin-top:16px;padding:20px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">Additional Details</p>
              <p style="margin:0;line-height:1.7;">${htmlDetails}</p>
            </div>` : ""}
          </div>
        `,
      });
    } else {
      console.log("💰 Quote request (RESEND_API_KEY not set):", data);
    }

    return NextResponse.json(
      { success: true, message: "Quote request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}