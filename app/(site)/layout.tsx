import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </div>

      {/* Modal global */}
      <AuthModal />
    </AuthProvider>
  );
}
