"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;
  isAuthOpen: boolean;
  authMode: "login" | "register";
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_USER_KEY = "nexa_auth_user";

function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.name === "string" && typeof v.email === "string";
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_USER_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isUser(parsed)) setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(LS_USER_KEY, JSON.stringify(u));
      else localStorage.removeItem(LS_USER_KEY);
    } catch {
      // ignore
    }
  };

  const openAuth = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  // Front-only mock: "logado" se email/senha preenchidos
  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Preencha e-mail e senha.");
    // Simula latência
    await new Promise((r) => setTimeout(r, 400));
    persistUser({ name: email.split("@")[0] || "Investidor", email });
    closeAuth();
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password)
      throw new Error("Preencha nome, e-mail e senha.");
    await new Promise((r) => setTimeout(r, 450));
    persistUser({ name, email });
    closeAuth();
  };

  const logout = () => persistUser(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      openAuth,
      closeAuth,
      isAuthOpen,
      authMode,
      login,
      register,
      logout,
    }),
    [user, isAuthOpen, authMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth deve ser usado dentro de <AuthProvider />");
  return ctx;
}
