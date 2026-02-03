import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexa Asset",
  description: "Gestão profissional com mentalidade tecnológica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#05030a] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
