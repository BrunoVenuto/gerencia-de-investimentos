"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register">(authMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthOpen) {
      setMode(authMode);
      setError(null);
      setLoading(false);
      // não limpa email/senha se você quiser manter, mas aqui eu mantenho simples:
      setPassword("");
    }
  }, [isAuthOpen, authMode]);

  // ESC fecha
  useEffect(() => {
    if (!isAuthOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAuthOpen, closeAuth]);

  const canSubmit = useMemo(() => {
    if (!isValidEmail(email)) return false;
    if (password.length < 4) return false;
    if (mode === "register" && name.trim().length < 2) return false;
    return true;
  }, [mode, name, email, password]);

  if (!isAuthOpen) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) return setError("Digite um e-mail válido.");
    if (password.length < 4) return setError("A senha deve ter no mínimo 4 caracteres.");
    if (mode === "register" && name.trim().length < 2) return setError("Digite seu nome.");

    setLoading(true);
    try {
      if (mode === "login") await login(email.trim(), password);
      else await register(name.trim(), email.trim(), password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Falha ao autenticar.";
      setError(msg);
setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <button
        onClick={closeAuth}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar modal"
      />

      {/* modal */}
      <div className="relative w-full sm:max-w-md">
        <div className="mx-auto w-full rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#0b0614]/95 shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
            <div>
              <div className="text-white font-semibold">
                {mode === "login" ? "Entrar" : "Criar conta"}
              </div>
              <div className="text-xs text-white/60">
                Acesso rápido (front-end). Depois ligamos o backend.
              </div>
            </div>

            <button
              onClick={closeAuth}
              className="rounded-full bg-white/5 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              Fechar
            </button>
          </div>

          {/* tabs */}
          <div className="px-5 sm:px-6 pt-4">
            <div className="grid grid-cols-2 rounded-2xl bg-white/5 ring-1 ring-white/10 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-xl py-2 text-sm ${
                  mode === "login"
                    ? "bg-gradient-to-r from-pink-500/90 to-violet-500/90 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`rounded-xl py-2 text-sm ${
                  mode === "register"
                    ? "bg-gradient-to-r from-pink-500/90 to-violet-500/90 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Cadastro
              </button>
            </div>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="px-5 sm:px-6 py-5 space-y-4">
            {mode === "register" ? (
              <div>
                <label className="text-xs text-white/70">Nome</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            ) : null}

            <div>
              <label className="text-xs text-white/70">E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@dominio.com"
                type="email"
                className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="text-xs text-white/70">Senha</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                type="password"
                className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="mt-2 text-[11px] text-white/50">
                Dica: por enquanto é mock (sem backend). Qualquer senha com 4+ chars.
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl bg-red-500/10 ring-1 ring-red-400/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={`w-full rounded-full px-5 py-3 text-sm font-medium btn-primary ${
                !canSubmit || loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processando..."
                : mode === "login"
                ? "Entrar"
                : "Criar conta"}
            </button>

            <div className="text-center text-xs text-white/50">
              Ao continuar, você concorda com os termos e política de privacidade (placeholder).
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
