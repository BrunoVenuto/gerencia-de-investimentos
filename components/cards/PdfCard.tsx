import type { LibraryItem } from "@/types/content";
import { formatDateISO } from "@/lib/format";

export function PdfCard({ item }: { item: LibraryItem }) {
  return (
    <div className="rounded-2xl card-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-white/60">{item.category}</span>
        <span className="text-xs text-white/60">
          {formatDateISO(item.date)}
        </span>
      </div>

      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
        {item.title}
      </div>

      <a
        href={item.pdf.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/10"
      >
        Baixar PDF
      </a>
    </div>
  );
}
