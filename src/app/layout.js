import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Liebeszit | Zeit für Liebe. Zeit zu helfen.",
  description: "Liebeszit ist Martins Weg, Menschen in schwierigen Momenten zu helfen. Melde dich, wenn du unterstützen möchtest.",
  authors: [{ name: "Martin" }],
  creator: "Liebeszit",
  publisher: "Liebeszit",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Liebeszit | Zeit für Liebe. Zeit zu helfen.",
    description: "Liebeszit ist Martins Weg, Menschen in schwierigen Momenten zu helfen. Melde dich, wenn du unterstützen möchtest.",
    siteName: "Liebeszit",
    locale: "de_CH",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/liebeszit-mark.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/liebeszit-mark.svg" />
        <meta name="theme-color" content="#D6435D" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
