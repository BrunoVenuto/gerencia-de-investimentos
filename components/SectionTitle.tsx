export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>

      {subtitle ? (
        <p className="mt-3 text-base text-neutral-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
