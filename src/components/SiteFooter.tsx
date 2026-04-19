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
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4">Products</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>WadiAI Chat</li>
            <li>Image Generator</li>
            <li>Deep Thinking AI</li>
            <li>Developer API</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Xenonymous. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Founded by <span className="text-foreground">Aakash Bashir</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
