import type { LibraryItem } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { formatDateISO } from "@/lib/format";

export function PdfCard({ item }: { item: LibraryItem }) {
  return (
    <div className="rounded-2xl card-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <Badge>{item.category}</Badge>
        <span className="text-xs text-white/60">
          {formatDateISO(item.date)}
        </span>
      </div>

      <div className="mt-4 text-lg font-semibold tracking-tight text-white">
        {item.title}
      </div>

      {item.description ? (
        <p className="mt-2 text-sm text-white/70 line-clamp-2">
          {item.description}
        </p>
      ) : null}

      <a
        href={item.pdf.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary"
      >
        Baixar PDF
      </a>
    </div>
  );
}
