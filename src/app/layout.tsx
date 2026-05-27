import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Fulber Lima — Desenvolvedor Full Stack",
  description:
    "Portfólio de Lucas Fulber Lima, Desenvolvedor Full Stack Jr. especializado em Next.js, React, TypeScript, Python e Django. Baseado em Porto Alegre, RS.",
  keywords: ["desenvolvedor full stack", "next.js", "react", "typescript", "python", "porto alegre"],
  authors: [{ name: "Lucas Fulber Lima" }],
  openGraph: {
    title: "Lucas Fulber Lima — Desenvolvedor Full Stack",
    description: "Portfólio profissional de Lucas Fulber Lima",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} dark`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
