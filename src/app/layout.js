import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "liebeszit - AI-Powered Project Management",
  description: "Transform ideas into executed projects with AI. liebeszit is your co-pilot that turns natural language commands into organized projects, automates tasks, and enables seamless team coordination.",
  keywords: "AI project management, project planning, team collaboration, task automation, productivity tools",
  authors: [{ name: "liebeszit Team" }],
  creator: "liebeszit",
  publisher: "liebeszit",
  robots: "index, follow",
  openGraph: {
    title: "liebeszit - AI-Powered Project Management",
    description: "Transform ideas into executed projects with AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "liebeszit - AI-Powered Project Management",
    description: "Transform ideas into executed projects with AI",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
