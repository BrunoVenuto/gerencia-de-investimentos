import { GlowCard } from "@/components/ui/GlowCard";

type Feature = {
  eyebrow: string;
  title: string;
  description: string;
};

export function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((f) => (
        <GlowCard key={f.title} className="p-6">
          <div className="text-xs text-white/60">{f.eyebrow}</div>
          <div className="mt-3 text-lg font-semibold text-white">{f.title}</div>
          <p className="mt-2 text-sm text-white/70">{f.description}</p>
        </GlowCard>
      ))}
    </div>
  );
}
