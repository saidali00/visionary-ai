import { Link } from "@tanstack/react-router";
import logo from "@/assets/xenonymous-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-deep mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Xenonymous logo" className="h-10 w-10" />
            <span className="font-display text-lg font-bold tracking-widest text-gradient">
              XENONYMOUS
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Intelligence Beyond Identity. We engineer intelligent systems that
            redefine human potential.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Ecosystem</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://wadiai.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                WadiAI
              </a>
            </li>
            <li>
              <a href="https://kashvega.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Kashvega
              </a>
            </li>
            <li>
              <a href="https://buzzflixearnmoney.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Buzzflix
              </a>
            </li>
            <li>
              <a href="https://brightpath-accademy.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                BrightPath Academy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Xenonymous. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Founded by{" "}
            <a
              href="https://portfoliobyakash.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              Aakash Bashir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
