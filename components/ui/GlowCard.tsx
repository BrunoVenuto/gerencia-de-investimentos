import { ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["relative rounded-2xl card-surface p-6", className].join(" ")}
    >
      {/* halo interno */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-60"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
