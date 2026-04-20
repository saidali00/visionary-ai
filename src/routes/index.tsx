import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Brain,
  Image as ImageIcon,
  Video,
  BookOpen,
  MessageSquare,
  Shield,
  Zap,
  Globe,
  Code2,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { FingerprintScanner } from "@/components/FingerprintScanner";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import heroImg from "@/assets/hero-neural.jpg";
import founderImg from "@/assets/founder-aakash.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xenonymous — Intelligence Beyond Identity" },
      {
        name: "description",
        content:
          "Building the next generation of artificial intelligence. Meet WadiAI — your intelligent companion for thinking, creating, and solving.",
      },
      { property: "og:title", content: "Xenonymous — Intelligence Beyond Identity" },
      {
        property: "og:description",
        content:
          "We engineer intelligent systems that redefine human potential. Discover WadiAI and the Xenonymous ecosystem.",
      },
    ],
  }),
  component: HomePage,
});

const products = [
  { icon: MessageSquare, title: "WadiAI Chat", desc: "Conversational intelligence that thinks alongside you." },
  { icon: ImageIcon, title: "Image Generator", desc: "Photoreal and stylized imagery from a single prompt." },
  { icon: Video, title: "Video Creator", desc: "Cinematic video synthesis powered by multimodal models." },
  { icon: BookOpen, title: "Study Assistant", desc: "Adaptive learning paths and instant explanations." },
  { icon: Brain, title: "Deep Thinking AI", desc: "Extended reasoning for the hardest problems." },
  { icon: Code2, title: "Developer API", desc: "Build with the Xenonymous engine on any stack." },
];

const features = [
  { icon: Zap, title: "Real-time intelligence", desc: "Sub-second responses across modalities." },
  { icon: Sparkles, title: "Multimodal AI", desc: "Text, image, video — one unified system." },
  { icon: Brain, title: "Fast learning models", desc: "Continuously refined, always evolving." },
  { icon: Shield, title: "Secure & private", desc: "Anonymous Mode keeps you in control." },
  { icon: Globe, title: "Global scale", desc: "Edge-deployed for worldwide low latency." },
  { icon: Code2, title: "Developer ready", desc: "First-class APIs and SDKs for builders." },
];

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-36 text-center">
          <Reveal className="flex justify-center mb-8">
            <AnimatedLogo size={180} />
          </Reveal>
          <Reveal delay={0.1} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Intelligence • Innovation • Future
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Building the Next Generation
              <br />
              of <span className="text-gradient">Artificial Intelligence</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground">
              Xenonymous engineers intelligent systems that enhance human potential.
              Meet <span className="text-foreground font-medium">WadiAI</span> — your intelligent
              companion for thinking, creating, and solving.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://wadiai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition"
              >
                Try WadiAI <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full glass glass-hover px-7 py-3 text-sm font-semibold text-foreground"
              >
                See Projects
              </Link>
            </div>
          </Reveal>

          {/* Fingerprint gateway */}
          <Reveal delay={0.7} className="mt-16 flex flex-col items-center">
            <FingerprintScanner />
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-3">PRODUCTS</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              The <span className="text-gradient">WadiAI</span> Ecosystem
            </h2>
            <p className="mt-4 text-muted-foreground">
              A unified suite of intelligent systems — modular, multimodal, and built to scale.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-hover rounded-2xl p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand glow mb-5">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-28 px-6 bg-deep">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-3">CAPABILITIES</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Engineered for <span className="text-gradient">scale and depth</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border border-border/40 hover:border-primary/40 transition">
                <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="relative py-28 px-6">
        <div className="mx-auto max-w-4xl glass rounded-3xl p-10 md:p-16 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-3">FOUNDER</p>
          <div className="mx-auto mb-8 h-32 w-32 rounded-full p-[3px] bg-brand glow animate-pulse-glow">
            <img
              src={founderImg}
              alt="Aakash Bashir, Founder of Xenonymous"
              width={256}
              height={256}
              loading="lazy"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Aakash Bashir</h2>
          <p className="text-primary font-medium mb-6">CEO & Founder · AI Architect</p>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-8">
            “Intelligence isn't a product — it's an architecture. At Xenonymous, we're
            designing systems that don't just answer questions, but expand the way
            humans think, create, and decide.”
          </p>
          <a
            href="https://portfoliobyakash.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-2.5 text-sm font-semibold text-foreground"
          >
            View Portfolio <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            The future <span className="text-gradient">thinks here</span>.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the early builders shaping the next era of intelligent systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wadiai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow"
            >
              Try WadiAI
            </a>
            <Link to="/contact" className="rounded-full glass glass-hover px-7 py-3 text-sm font-semibold">
              Build with Us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
