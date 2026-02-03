import Link from "next/link";
import type { Career } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

export function CareerCard({ career }: { career: Career }) {
  return (
    <div className="rounded-2xl card-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{career.area}</Badge>
        <Badge>{career.type}</Badge>
        <span className="text-xs text-white/60">{career.location}</span>
      </div>

      <div className="mt-4 text-base sm:text-lg font-semibold tracking-tight text-white">
        {career.title}
      </div>

      <p className="mt-2 text-sm text-white/70 line-clamp-3">
        {career.description}
      </p>

      <div className="mt-5">
        <Link
          href={`/carreira/${career.slug}`}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary"
        >
          Ver vaga
        </Link>
      </div>
    </div>
  );
}
