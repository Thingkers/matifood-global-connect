import { Link } from "@tanstack/react-router";
import { Leaf, MapPin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            <span className="font-serif text-xl font-bold">NISIL Agro</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Bringing the bounty of Bangladesh to the world. Home of MatiFood — Soil to Soul.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/matifood" className="hover:text-accent">MatiFood</Link></li>
            <li><Link to="/operations" className="hover:text-accent">Operations</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Headquarters</h4>
          <p className="mt-3 flex gap-2 text-sm text-primary-foreground/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            Village: Nayapara, P.O: Palichara, Soddopuskurini, Rangpur Sadar, Rangpur, Bangladesh.
          </p>
          <p className="mt-3 flex gap-2 text-sm text-primary-foreground/80">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" /> info@nisilagro.com
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Legal</h4>
          <p className="mt-3 text-sm text-primary-foreground/80">
            A General Partnership registered under the Partnership Act of 1932. NISIL Agro and MatiFood
            are trademarks incorporating the goodwill of the original NISIL Agro entity.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} NISIL Agro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
