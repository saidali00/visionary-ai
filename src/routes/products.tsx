import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare, Image as ImageIcon, Video, BookOpen, Brain, Code2, ArrowRight, Check,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — WadiAI Ecosystem | Xenonymous" },
      {
        name: "description",
        content:
          "Explore the WadiAI ecosystem: chat, image, video, study, deep-thinking AI, and a developer API — all built by Xenonymous.",
      },
      { property: "og:title", content: "WadiAI Ecosystem — Xenonymous Products" },
      {
        property: "og:description",
        content: "A unified suite of intelligent systems. Modular. Multimodal. Built to scale.",
      },
    ],
  }),
  component: ProductsPage,
});

const products = [
  {
    icon: MessageSquare,
    name: "WadiAI Chat",
    tag: "Conversational AI",
    desc: "A thinking partner that remembers context, adapts to your tone, and reasons step-by-step.",
    features: ["Long-context memory", "Personality presets", "Anonymous mode"],
  },
  {
    icon: ImageIcon,
    name: "Image Generator",
    tag: "Visual Synthesis",
    desc: "Photoreal and stylized imagery from a single prompt — with style control and edits.",
    features: ["Style transfer", "In-painting", "4K upscale"],
  },
  {
    icon: Video,
    name: "Video Creator",
    tag: "Multimodal",
    desc: "Generate cinematic short-form video from text or storyboards.",
    features: ["Text-to-video", "Scene continuity", "Voice sync"],
  },
  {
    icon: BookOpen,
    name: "Study Assistant",
    tag: "Learning",
    desc: "Adaptive learning paths, instant explanations, and personalized practice.",
    features: ["Curriculum aware", "Step solutions", "Quiz engine"],
  },
  {
    icon: Brain,
    name: "Deep Thinking AI",
    tag: "Reasoning",
    desc: "Extended reasoning model for math, code, research, and multi-step planning.",
    features: ["Chain-of-thought", "Tool use", "Self-verification"],
  },
  {
    icon: Code2,
    name: "Developer API",
    tag: "Platform",
    desc: "Build with the Xenonymous engine. One API, every modality.",
    features: ["REST + streaming", "SDKs", "Generous free tier"],
  },
];

function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative bg-hero py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-4">PRODUCTS</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            The <span className="text-gradient">WadiAI</span> Ecosystem
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            One unified intelligence. Six specialized modules. Built to think, create,
            and solve across every modality.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map(({ icon: Icon, name, tag, desc, features }) => (
            <div key={name} className="glass glass-hover rounded-2xl p-7 flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand glow">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                  {tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
              <ul className="space-y-2 mt-auto">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-deep">
        <div className="mx-auto max-w-4xl text-center glass rounded-3xl p-10 md:p-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to <span className="text-gradient">build with us</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the WadiAI beta and shape the future of intelligent systems.
          </p>
          <a
            href="https://wadiai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow"
          >
            Try WadiAI Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
