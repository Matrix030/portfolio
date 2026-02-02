import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rishikesh Gharat | Software Engineer",
  description: "I build tools I wish existed. Software Engineer and CS grad student at NYU, specializing in full-stack development, AI/ML, and developer tools.",
  keywords: ["Rishikesh Gharat", "software engineer", "NYU", "full stack developer", "AI", "machine learning", "developer tools"],
  authors: [{ name: "Rishikesh Gharat" }],
  creator: "Rishikesh Gharat",
  openGraph: {
    title: "Rishikesh Gharat | Software Engineer",
    description: "I build tools I wish existed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-accent text-primary-foreground px-4 py-2 rounded font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
