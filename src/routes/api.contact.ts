import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

const FOUNDER_EMAIL = "bhatakash07d@gmail.com";

async function sendViaResend(payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(`Resend error [${res.status}]: ${JSON.stringify(data)}`);
  }
  return data;
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = ContactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { error: "Invalid input", details: parsed.error.flatten() },
              { status: 400 }
            );
          }
          const { name, email, subject, message } = parsed.data;
          const cleanSubject = subject || `New message from ${name}`;

          // Notify founder
          const notifyHtml = `
            <div style="font-family:Arial,sans-serif;background:#0b1020;color:#e6edf7;padding:24px;border-radius:12px">
              <h2 style="color:#22d3ee;margin:0 0 12px">New Xenonymous contact</h2>
              <p style="margin:0 0 6px"><strong>Name:</strong> ${escape(name)}</p>
              <p style="margin:0 0 6px"><strong>Email:</strong> ${escape(email)}</p>
              <p style="margin:0 0 12px"><strong>Subject:</strong> ${escape(cleanSubject)}</p>
              <div style="background:#111a33;padding:16px;border-radius:8px;line-height:1.6">${escape(message)}</div>
            </div>`;

          await sendViaResend({
            from: "Xenonymous Contact <onboarding@resend.dev>",
            to: [FOUNDER_EMAIL],
            subject: `[Xenonymous] ${cleanSubject}`,
            html: notifyHtml,
            reply_to: email,
          });

          // Confirmation to sender
          const confirmHtml = `
            <div style="font-family:Arial,sans-serif;background:#ffffff;color:#0b1020;padding:24px;max-width:560px;margin:0 auto">
              <h2 style="color:#0ea5b7;margin:0 0 12px">Thanks for reaching out, ${escape(name)}!</h2>
              <p style="line-height:1.6">We've received your message and the Xenonymous team will get back to you shortly.</p>
              <p style="line-height:1.6;color:#475569;font-size:14px">— Aakash Bashir, Founder · Xenonymous</p>
            </div>`;

          await sendViaResend({
            from: "Xenonymous <onboarding@resend.dev>",
            to: [email],
            subject: "We received your message — Xenonymous",
            html: confirmHtml,
          });

          return Response.json({ success: true });
        } catch (err) {
          console.error("contact api error:", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
          );
        }
      },
    },
  },
});
