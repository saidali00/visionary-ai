import { createFileRoute } from "@tanstack/react-router";
import { Target, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Xenonymous" },
      {
        name: "description",
        content:
          "Xenonymous is an AI research and product company building scalable, ethical, and intelligent systems that enhance human potential.",
      },
      { property: "og:title", content: "About Xenonymous" },
      {
        property: "og:description",
        content: "Vision, mission, and the team behind the next generation of AI.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Target, title: "Mission", text: "Create scalable, intelligent, and ethical AI technologies that empower people everywhere." },
  { icon: Compass, title: "Vision", text: "Build AI systems that enhance human intelligence globally — beyond identity, beyond boundaries." },
  { icon: ShieldCheck, title: "Principles", text: "Privacy first. Safety by design. Transparency in research. Power in the hands of builders." },
  { icon: Sparkles, title: "Approach", text: "Multimodal models, deep reasoning, and a developer-grade platform — all under one roof." },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative bg-hero py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-4">ABOUT XENONYMOUS</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Intelligence <span className="text-gradient">Beyond Identity</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            We are an AI research and product company building intelligent systems
            that work for everyone — anonymously, securely, and at planetary scale.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass glass-hover rounded-2xl p-8">
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-deep">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-4 text-center">OUR STORY</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
            From a single idea to an <span className="text-gradient">AI ecosystem</span>
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              Xenonymous was founded on a simple belief: artificial intelligence should
              amplify the human mind, not replace it. We started with a question — what
              if a single platform could think, create, and reason across every modality?
            </p>
            <p>
              Today, that platform is <span className="text-foreground font-medium">WadiAI</span> —
              a modular ecosystem of chat, image, video, study, and deep-reasoning
              intelligence. Built privately. Designed openly. Engineered to scale.
            </p>
            <p>
              We are just getting started.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
