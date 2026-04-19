import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Xenonymous" },
      {
        name: "description",
        content:
          "Get in touch with Xenonymous. Partner with us, join the WadiAI beta, or build on our platform.",
      },
      { property: "og:title", content: "Contact Xenonymous" },
      {
        property: "og:description",
        content: "Talk to the team behind WadiAI. We're building the next era of AI.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative bg-hero py-24 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-4">CONTACT</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Let's <span className="text-gradient">build together</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a developer, researcher, or visionary — we want to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <Mail className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">hello@xenonymous.ai</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <MessageSquare className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Partnerships</h3>
              <p className="text-sm text-muted-foreground">partners@xenonymous.ai</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-1">Founder</h3>
              <p className="text-sm text-muted-foreground">
                Aakash Bashir
                <br />
                CEO & Founder
              </p>
            </div>
          </div>

          <form
            className="md:col-span-3 glass rounded-2xl p-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-muted-foreground mb-2">NAME</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg bg-input/50 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-muted-foreground mb-2">EMAIL</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg bg-input/50 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-muted-foreground mb-2">SUBJECT</label>
              <input
                type="text"
                className="w-full rounded-lg bg-input/50 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-muted-foreground mb-2">MESSAGE</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-lg bg-input/50 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition"
            >
              {sent ? "Message sent ✓" : "Send Message"}
              {!sent && <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
