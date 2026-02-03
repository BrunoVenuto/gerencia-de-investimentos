// ===== FUNDOS =====

export type Fund = {
  id: string;
  slug: string;

  name: string;
  strategy: string;
  description: string;

  riskLevel: "Baixo" | "Moderado" | "Alto";

  // campos institucionais opcionais
  cnpj?: string;
  inceptionDate?: string;
  administrator?: string;
  manager?: string;
  custodian?: string;

  minimumInvestment?: string;
  targetAudience?: string;

  // PDF da lâmina
  factsheetPdf?: {
    name: string;
    url: string;
    month?: string;
  };

  // pronto para integrações futuras
  performance?: {
    yearToDate?: number;
    last12Months?: number;
    volatility?: number;
    sharpe?: number;
    cdiPercentage?: number;
  };
};

// ===== ARTIGOS =====

export type Article = {
  id: string;
  slug: string;

  title: string;
  excerpt: string;
  content: string;

  category: string;
  publishedAt: string;

  author?: {
    name: string;
    role?: string;
  };
};

// ===== BIBLIOTECA / PDFs =====

export type LibraryItem = {
  id: string;
  title: string;
  description?: string;

  category: string; // Ex: Lâmina, Carta, Apresentação

  date: string;

  pdf: {
    name: string;
    url: string;
    sizeKb?: number;
  };
};

// ===== CARREIRA =====

export type Career = {
  id: string;
  slug: string;

  title: string;
  area: string;

  location: string;
  type: "Presencial" | "Híbrido" | "Remoto";

  description: string;
  requirements: string[];
  benefits?: string[];

  publishedAt: string;
};

// ===== CONTATO =====

export type ContactForm = {
  name: string;
  email: string;
  phone?: string;

  subject: string;
  message: string;
};

// ===== NAVEGAÇÃO (opcional se formos mover o menu para JSON) =====

export type NavigationItem = {
  href: string;
  label: string;
};
