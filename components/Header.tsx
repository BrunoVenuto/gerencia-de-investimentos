"use client";

import Link from "next/link";
import { MouseEvent } from "react";
import { Container } from "@/components/Container";
import { PillNav } from "@/components/ui/PillNav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAuth } from "@/components/auth/AuthProvider";

const nav = [
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/fundos", label: "Fundos" },
  { href: "/artigos", label: "Artigos" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/carreira", label: "Carreira" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const { user, openAuth, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b hr-voxnava bg-black/20 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-white"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink-400 to-violet-400" />
              </span>
              <span className="tracking-tight">NEXA</span>
              <span className="text-white/60 tracking-tight">ASSET</span>
            </Link>

            {/* Nav (desktop via PillNav) */}
            <div className="hidden md:block">
              <PillNav items={nav} />
            </div>

            {/* Action */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="hidden sm:inline text-xs text-white/70">
                    Olá, <span className="text-white">{user.name}</span>
                  </span>

                  <button
                    onClick={logout}
                    className="rounded-full bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <PrimaryButton
                  href="#"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    openAuth("login");
                  }}
                >
                  Sign In
                </PrimaryButton>
              )}
            </div>
          </div>

          {/* Nav mobile (pill simples) */}
          <div className="md:hidden pb-3">
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {nav.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
