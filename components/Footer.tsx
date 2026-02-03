import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t hr-soft bg-black/15">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Asset Management — Todos os direitos
            reservados.
          </div>

          <div className="text-sm text-white/60">
            Contato: <span className="text-white">ri@asset.com</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
