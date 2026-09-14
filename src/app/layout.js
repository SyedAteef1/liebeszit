import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Liebeszit",
  description: "We got the Spark, your donation is the Fuel! Unterstütze Liebeszit – oder melde dich, wenn du selbst Unterstützung brauchst.",
  creator: "Liebeszit",
  publisher: "Liebeszit",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Liebeszit",
    description: "We got the Spark, your donation is the Fuel! Unterstütze Liebeszit – oder melde dich, wenn du selbst Unterstützung brauchst.",
    siteName: "Liebeszit",
    locale: "de_CH",
    images: [{ url: "/liebeszit-icon.png", width: 256, height: 256, alt: "Liebeszit" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/liebeszit-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/liebeszit-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-inter antialiased bg-black">
        {children}
      </body>
    </html>
  );
}
