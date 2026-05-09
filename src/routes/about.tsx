import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { Briefcase, Stethoscope, LineChart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NISIL Agro — Our Foundation & Leadership" },
      { name: "description", content: "Founded January 1, 2026, NISIL Agro is a general partnership scaling agricultural operations through expert collaboration." },
      { property: "og:title", content: "About NISIL Agro" },
      { property: "og:description", content: "Founders, mission, and the foundation behind NISIL Agro and MatiFood." },
    ],
  }),
  component: About,
});

const partners = [
  { name: "Md. Rezaul Hasan", role: "Lead Partner", bio: "Background in Medicine and Business; drives the strategic direction and partnerships of NISIL Agro.", icon: Stethoscope },
  { name: "Mohammod Zakir Hossain", role: "Business Operations Specialist", bio: "Leads day-to-day operations, supply chain coordination, and execution excellence.", icon: Briefcase },
  { name: "Muhammad Jubayed Sadek", role: "Business Strategy Lead", bio: "Shapes long-term strategy, market expansion, and corporate partnerships.", icon: LineChart },
];

function About() {
  return (
    <>
      <Section className="pb-10">
        <div className="max-w-3xl">
          <Eyebrow>About NISIL Agro</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight">The foundation behind every harvest.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Founded on January 1, 2026, NISIL Agro was established to scale agricultural operations through
            expert partnership — built on trust, professional rigor and a deep connection to the soil of Bangladesh.
          </p>
        </div>
      </Section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold">From Rangpur to the world</h2>
            <p className="mt-4 text-foreground/80">
              NISIL Agro is a general partnership registered under the Partnership Act of 1932. The firm
              incorporates all trademarks and goodwill of the original NISIL Agro entity, carrying forward
              a legacy of integrity in agri-trade.
            </p>
          </div>
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold">Regulatory & supply chain excellence</h2>
            <p className="mt-4 text-foreground/80">
              To facilitate regulatory affairs and supply chain excellence for individual and corporate
              clients globally — bridging Bangladesh's agricultural abundance with international markets.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="text-center">
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-bold">Meet our founding partners</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {partners.map((p) => (
            <article key={p.name} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-leaf)" }}>
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">{p.role}</p>
              <p className="mt-4 text-sm text-muted-foreground">{p.bio}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
