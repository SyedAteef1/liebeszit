import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Liebeszit | Autonomous AI Project Manager",
  description: "Stop burning cash on inefficiency. Liebeszit is an AI Project Manager that automates tasks, eliminates stand-ups, and reclaims your team's lost time.",
  keywords: "AI project management, project planning, team collaboration, task automation, productivity tools",
  authors: [{ name: "liebeszit Team" }],
  creator: "liebeszit",
  publisher: "liebeszit",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://liebeszit.ch/",
    title: "Liebeszit | Autonomous AI Project Manager",
    description: "Stop burning cash on inefficiency. Liebeszit is an AI Project Manager that automates tasks, eliminates stand-ups, and reclaims your team's lost time.",
    siteName: "liebeszit",
    locale: "en_US",
    images: [{
      url: "https://liebeszit.ch/Images/F.png",
      width: 1200,
      height: 628,
      alt: "liebeszit - AI Operational Co-Pilot",
    }],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://liebeszit.ch/",
    title: "Liebeszit | Autonomous AI Project Manager",
    description: "Stop burning cash on inefficiency. Liebeszit is an AI Project Manager that automates tasks, eliminates stand-ups, and reclaims your team's lost time.",
    images: ["https://liebeszit.ch/Images/F.png"],
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/Images/F.png" />
        <link rel="apple-touch-icon" href="/Images/F.png" />
        <meta name="theme-color" content="#4C3BCF" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://liebeszit.ch/" />
        <meta property="og:title" content="Liebeszit | Autonomous AI Project Manager" />
        <meta property="og:description" content="Stop burning cash on inefficiency. Liebeszit is an AI Project Manager that automates tasks, eliminates stand-ups, and reclaims your team's lost time." />
        <meta property="og:image" content="https://liebeszit.ch/Images/F.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:image:alt" content="liebeszit - AI Operational Co-Pilot" />
        <meta name="twitter:url" content="https://liebeszit.ch/" />
        <meta name="twitter:title" content="Liebeszit | Autonomous AI Project Manager" />
        <meta name="twitter:description" content="Stop burning cash on inefficiency. Liebeszit is an AI Project Manager that automates tasks, eliminates stand-ups, and reclaims your team's lost time." />
        <meta name="twitter:image" content="https://liebeszit.ch/Images/F.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
