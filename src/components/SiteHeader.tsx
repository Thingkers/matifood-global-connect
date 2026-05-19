import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/nisil-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/matifood", label: "MatiFood" },
  { to: "/matifood#products", label: "Products" },
  { to: "/operations", label: "Operations" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="NISIL Agro logo" className="h-10 w-10 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-primary">NISIL Agro</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Soil to Soul</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const hasHash = n.to.includes('#');
            const base = hasHash ? n.to.split('#')[0] : n.to;
            const hash = hasHash ? n.to.split('#')[1] : null;
            return (
              <Link
                key={n.to}
                to={base}
                onClick={(e) => {
                  if (hash) {
                    // delay to allow route navigation
                    setTimeout(() => {
                      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }
                }}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-primary"
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="ml-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary-glow"
          >
            Inquire
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => {
              const hasHash = n.to.includes('#');
              const base = hasHash ? n.to.split('#')[0] : n.to;
              const hash = hasHash ? n.to.split('#')[1] : null;
              return (
                <Link
                  key={n.to}
                  to={base}
                  onClick={() => {
                    setOpen(false);
                    if (hash) {
                      setTimeout(() => {
                        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    }
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80"
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
