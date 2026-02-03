"use client";

import { useMemo, useState } from "react";
import type { LibraryItem } from "@/types/content";
import { PdfCard } from "@/components/cards/PdfCard";
import { Badge } from "@/components/ui/Badge";

export function LibraryClient({
  items,
  categories,
}: {
  items: LibraryItem[];
  categories: string[];
}) {
  const [selected, setSelected] = useState<string>("Todos");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return items.filter((i) => {
      const matchesCategory =
        selected === "Todos" ? true : i.category === selected;

      const matchesQuery = query
        ? (i.title?.toLowerCase().includes(query) ?? false) ||
          (i.description?.toLowerCase().includes(query) ?? false) ||
          (i.pdf?.name?.toLowerCase().includes(query) ?? false)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [items, selected, q]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelected("Todos")}
            className={[
              "rounded-full px-4 py-2 text-sm ring-1 transition",
              selected === "Todos"
                ? "bg-white/10 text-white ring-white/20"
                : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            Todos
          </button>

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={[
                "rounded-full px-4 py-2 text-sm ring-1 transition",
                selected === c
                  ? "bg-white/10 text-white ring-white/20"
                  : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Badge>{filtered.length} itens</Badge>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, descrição ou arquivo..."
            className="w-full md:w-[340px] rounded-full bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <PdfCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl card-surface p-8 text-center">
          <div className="text-white font-semibold">Nada encontrado</div>
          <div className="mt-2 text-sm text-white/70">
            Tente trocar o filtro ou buscar por outra palavra.
          </div>
        </div>
      )}
    </div>
  );
}
