"use client";

type Props = {
  label: string;
};

export function ContactSubmitButton({ label }: Props) {
  return (
    <button
      type="button"
      className="w-full rounded-full px-5 py-3 text-sm font-medium btn-primary"
      onClick={() => {
        alert("SEO ok. Próximo passo: ligar envio real (API/email/WhatsApp).");
      }}
    >
      {label}
    </button>
  );
}
