import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Générateur de CV ITEC",
  description: "Remplissez le formulaire, voyez le CV en temps réel et téléchargez-le au format Word ITEC.",
  icons: { icon: "/logo-itec.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
