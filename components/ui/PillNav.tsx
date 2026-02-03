import Link from "next/link";

type Item = { href: string; label: string };

export function PillNav({ items }: { items: Item[] }) {
  return (
    <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="rounded-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
