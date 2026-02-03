import { Badge } from "@/components/ui/Badge";

type Step = {
  step: string;
  pill: string;
  title: string;
  description: string;
};

export function StepsGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-10 sm:mt-12">
      {/* MOBILE-FIRST: 1 coluna; 3 colunas só no md */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.step} className="rounded-2xl card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] text-white/60 tracking-wider">
                {s.step}
              </div>
              <Badge>{s.pill}</Badge>
            </div>

            <div className="mt-4 text-base sm:text-lg font-semibold text-white">
              {s.title}
            </div>

            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
