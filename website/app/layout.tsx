import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lozaoptique.com"),
  title: {
    default: "Loza Optique | Opticien à Casablanca",
    template: "%s | Loza Optique",
  },
  description:
    "Loza Optique à Casablanca : montures sélectionnées, conseil personnalisé, mesure et ajustement pour le confort de chaque regard.",
  keywords: [
    "opticien Casablanca",
    "lunettes Casablanca",
    "montures optiques",
    "lunettes de soleil",
    "Loza Optique",
  ],
  icons: {
    icon: [
      {
        url: "/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/",
    siteName: "Loza Optique",
    title: "Loza Optique | Opticien à Casablanca",
    description:
      "Des montures sélectionnées avec précision, un conseil humain et un savoir-faire dédié au confort de chaque regard.",
    images: [
      {
        url: "/brand/logo-vertical.png",
        width: 800,
        height: 800,
        alt: "Logo Loza Optique",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Loza Optique | Opticien à Casablanca",
    description:
      "Montures sélectionnées, conseil personnalisé, mesure et ajustement à Casablanca.",
    images: ["/brand/logo-vertical.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
