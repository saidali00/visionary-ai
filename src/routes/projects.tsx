import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight, Sparkles, HandHeart, GraduationCap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import kashvegaImg from "@/assets/project-kashvega.jpg";
import buzzflixImg from "@/assets/project-buzzflix.jpg";
import brightpathImg from "@/assets/project-brightpath.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Xenonymous & Aakash Bashir" },
      {
        name: "description",
        content:
          "Explore projects by Aakash Bashir and Xenonymous: Kashvega AI image generation, Buzzflix earn-and-help platform, and BrightPath Academy free education.",
      },
      { property: "og:title", content: "Projects — Xenonymous" },
      {
        property: "og:description",
        content:
          "A growing portfolio of intelligent products: Kashvega, Buzzflix, BrightPath Academy and more.",
      },
      { property: "og:image", content: "/src/assets/project-kashvega.jpg" },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    name: "Kashvega",
    tagline: "AI Image Generation",
    icon: Sparkles,
    image: kashvegaImg,
    url: "https://kashvega.vercel.app/",
    description:
      "An AI-powered image generation studio that turns prompts into striking visuals — from photoreal scenes to stylized art, designed for creators who think in pictures.",
    highlights: ["Prompt-to-image", "Multiple art styles", "Built for creators"],
  },
  {
    name: "Buzzflix",
    tagline: "Survive · Work · Earn · Help",
    icon: HandHeart,
    image: buzzflixImg,
    url: "https://buzzflixearnmoney.vercel.app/",
    description:
      "A platform that helps people survive and thrive — earn money through real work and help others along the way. Built to give opportunity to those who need it most.",
    highlights: ["Earn while you learn", "Community helping community", "Open to everyone"],
  },
  {
    name: "BrightPath Academy",
    tagline: "Free Education for All",
    icon: GraduationCap,
    image: brightpathImg,
    url: "https://brightpath-accademy.vercel.app/",
    description:
      "A free education platform — no fees, no barriers. BrightPath delivers structured learning to anyone with the will to learn, from foundational skills to advanced topics.",
    highlights: ["100% free, forever", "Structured curriculum", "Learn at your pace"],
  },
];

function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative bg-hero py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary mb-4">PROJECTS</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Built by <span className="text-gradient">Aakash Bashir</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A growing portfolio of products engineered with purpose — creativity,
            opportunity, and education for everyone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://portfoliobyakash.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition"
            >
              View Founder Portfolio <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://wadiai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-7 py-3 text-sm font-semibold text-foreground"
            >
              Try WadiAI <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl space-y-10">
          {projects.map(({ name, tagline, icon: Icon, image, url, description, highlights }, i) => (
            <article
              key={name}
              className={`glass glass-hover rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <a href={url} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden">
                <img
                  src={image}
                  alt={`${name} — ${tagline}`}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </a>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand glow mb-5">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-[10px] font-semibold tracking-widest text-primary uppercase mb-2">
                  {tagline}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
                <ul className="space-y-2 mb-8">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {h}
                    </li>
                  ))}
                </ul>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition w-fit"
                >
                  Visit {name} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-deep">
        <div className="mx-auto max-w-4xl text-center glass rounded-3xl p-10 md:p-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            More products. <span className="text-gradient">More impact.</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Xenonymous keeps shipping. Want to collaborate or build something
            together? Let's talk.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
