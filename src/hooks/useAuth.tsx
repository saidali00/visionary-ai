import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  email: string | null;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [welcomedFor, setWelcomedFor] = useState<string | null>(null);

  useEffect(() => {
    // Set up listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === "SIGNED_IN" && newSession?.user) {
        const uid = newSession.user.id;
        // Defer Supabase calls to avoid deadlock
        setTimeout(() => {
          loadProfile(uid).then((p) => {
            setProfile(p);
            if (welcomedFor !== uid) {
              const name = p?.display_name || newSession.user.email?.split("@")[0] || "back";
              toast.success(`Welcome, ${name}! 👋`);
              setWelcomedFor(uid);
            }
          });
        }, 0);
      }

      if (event === "SIGNED_OUT") {
        setProfile(null);
        setWelcomedFor(null);
      }
    });

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      if (existing?.user) {
        loadProfile(existing.user.id).then(setProfile);
        setWelcomedFor(existing.user.id); // don't re-welcome on refresh
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProfile(uid: string): Promise<Profile | null> {
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, email")
      .eq("id", uid)
      .maybeSingle();
    return data ?? null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
