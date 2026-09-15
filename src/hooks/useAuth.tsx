import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { authConfig } from "@/lib/env";

export const AUTH_STORAGE_KEY = "pulseboard-auth";

interface Session {
  username: string;
}

interface AuthValue {
  session: Session | null;
  isAuthenticated: boolean;
  /** Returns true when the credentials match the configured pair. */
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

const readSession = (): Session | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && typeof (parsed as Session).username === "string") {
      return { username: (parsed as Session).username };
    }
    return null;
  } catch {
    // Blocked storage or malformed value — treat as signed out.
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() =>
    typeof window === "undefined" ? null : readSession(),
  );

  const signIn = useCallback((username: string, password: string) => {
    const ok =
      username.trim() === authConfig.username && password === authConfig.password;
    if (!ok) return false;

    const next: Session = { username: username.trim() };
    setSession(next);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Session is memory-only when storage is unavailable.
    }
    return true;
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ session, isAuthenticated: session !== null, signIn, signOut }),
    [session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
