import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, Truck, Factory, Sprout, ArrowRight, Leaf } from "lucide-react";
import hero from "@/assets/hero-orchard.jpg";
import processing from "@/assets/processing.jpg";
import logo from "@/assets/matifood-logo.png";
import { Section, Eyebrow } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NISIL Agro — Bringing the Bounty of Bangladesh to the World" },
      { name: "description", content: "Premium fresh and processed agricultural products from Bangladesh. Home of MatiFood — Soil to Soul." },
      { property: "og:title", content: "NISIL Agro — Bringing the Bounty of Bangladesh to the World" },
      { property: "og:description", content: "Premium fresh and processed agricultural products from Bangladesh. Home of MatiFood." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* MATIFOOD ANNOUNCEMENT STRIP */}
      <Link to="/matifood" className="block bg-primary text-primary-foreground transition hover:bg-primary-glow">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center text-sm sm:px-6 lg:px-8">
          <img src={logo} alt="" className="h-6 w-6 rounded bg-primary-foreground/10 object-contain p-0.5" />
          <span className="font-semibold tracking-wide">Introducing MatiFood</span>
          <span className="hidden text-primary-foreground/70 sm:inline">·</span>
          <span className="font-serif italic text-accent">Taste Real Luxury</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Lush orchards in Bangladesh" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-start justify-center px-4 py-24 text-primary-foreground sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <Leaf className="h-3.5 w-3.5" /> NISIL Agro · Est. 2016
          </span>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Bringing the Bounty of Bangladesh to the World.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 sm:text-xl">
            Introducing <span className="font-semibold text-accent">MatiFood</span> — your source for
            premium fresh and processed agricultural products, sourced from the fertile heart of Rangpur.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/matifood" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110">
              Explore MatiFood <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 bg-primary-foreground/5 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/15">
              Corporate Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* CORE COMPETENCIES */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Core Competencies</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">A global agri-trade partnership</h2>
          <p className="mt-4 text-muted-foreground">From orchard to overseas markets — we manage every link in the chain.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe2, title: "Export", desc: "Premium produce delivered to international markets with full compliance." },
            { icon: Truck, title: "Import", desc: "Sourcing essential agri-inputs and finished goods for B2B clients." },
            { icon: Factory, title: "Agri-Processing", desc: "Modern facilities turning raw harvests into export-grade products." },
            { icon: Sprout, title: "Regulatory", desc: "Expert consulting on the regulatory affairs of the agri-trade industry." },
          ].map((c) => (
            <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-primary/30">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-leaf)" }}>
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MATIFOOD SPOTLIGHT */}
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Flagship Brand</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              MatiFood — <span className="text-primary">Taste Real Luxury</span>
            </h2>
            <p className="mt-5 text-lg text-foreground/80">
              MatiFood is the flagship brand of NISIL Agro. Built on safety, transparency and quality,
              every fruit, vegetable, juice and pulp under the MatiFood label travels the safest path
              from farm to table — for customers who don't compromise.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <img src={logo} alt="MatiFood logo" className="h-16 w-16 rounded-xl bg-primary object-contain p-1 shadow-[var(--shadow-soft)]" />
              <Link to="/matifood" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow">
                Discover the brand <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={processing} alt="Modern agri-processing facility" loading="lazy" width={1280} height={800} className="rounded-3xl object-cover shadow-[var(--shadow-soft)]" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-glow)] sm:block">
              <div className="font-serif text-3xl font-bold">100%</div>
              <div className="text-xs uppercase tracking-widest text-primary-foreground/80">Export-grade quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Section>
        <div className="grid gap-6 rounded-3xl bg-primary p-10 text-primary-foreground sm:grid-cols-3">
          {[
            { k: "3", l: "Founding partners" },
            { k: "2 cities", l: "Rangpur HQ · Dhaka office" },
            { k: "Global", l: "Export-ready supply chain" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-4xl font-bold">{s.k}</div>
              <div className="mt-1 text-sm uppercase tracking-widest text-primary-foreground/80">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
