import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import logo from "@/assets/xenonymous-logo.png";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  // Close drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const displayName = profile?.display_name || user?.email?.split("@")[0];
  const avatar = profile?.avatar_url;

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Xenonymous logo"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
            />
            <span className="font-display text-lg font-bold tracking-widest text-gradient">
              XENONYMOUS
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {!loading && user && (
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5">
                {avatar ? (
                  <img src={avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground">
                    {displayName?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
                  {displayName}
                </span>
              </div>
            )}
            {!loading && !user && (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-primary-foreground glow hover:opacity-90 transition-opacity"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            )}

            <button
              className="text-foreground rounded-md p-2 hover:bg-accent/40 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[88%] max-w-sm glass border-l border-border/50 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <span className="font-display text-sm font-bold tracking-widest text-gradient">
            MENU
          </span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-foreground hover:bg-accent/40 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User block */}
        <div className="border-b border-border/50 px-6 py-5">
          {loading ? (
            <div className="h-10 animate-pulse rounded-lg bg-muted/30" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {avatar ? (
                <img src={avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-base font-bold text-primary-foreground">
                  {displayName?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  Welcome, {displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition-opacity"
            >
              <LogIn className="h-4 w-4" />
              Sign in / Sign up
            </Link>
          )}
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/30 hover:text-primary transition-colors"
              activeProps={{ className: "bg-accent/40 text-primary" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://wadiai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 mx-1 rounded-full bg-brand px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground glow hover:opacity-90 transition-opacity"
          >
            Try WadiAI →
          </a>
        </nav>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 px-3 py-4">
            <button
              onClick={async () => {
                await signOut();
                setOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </aside>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  );
}
