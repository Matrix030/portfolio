import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "./components/Background";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add custom fonts
const manifold = localFont({
  src: [
    {
      path: '../public/fonts/ManifoldExtendedCF/ManifoldExtendedCF.woff2',
      weight: '400 700',
      style: 'normal',
    }
  ],
  variable: '--font-manifold',
  display: 'swap',
});

const forma = localFont({
  src: [
    {
      path: '../public/fonts/FormaDJR/FormaDJRText-Medium-Testing.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FormaDJR/FormaDJRText-Regular-Testing.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-forma',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rishikesh Gharat | Full Stack Developer & Computer Science Graduate",
  description: "Personal portfolio of Rishikesh Gharat, a Full Stack Developer and Computer Science Graduate from New York University specializing in web development, cloud solutions, and AI/ML.",
  keywords: ["Rishikesh Gharat", "full stack developer", "NYU", "computer science", "web development", "React", "Next.js", "AI", "ML"],
  authors: [{ name: "Rishikesh Gharat" }],
  creator: "Rishikesh Gharat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manifold.variable} ${forma.variable} antialiased bg-brand-dark`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-brand-teal text-black px-4 py-2 rounded font-medium"
        >
          Skip to main content
        </a>
        <Background>{children}</Background>
      </body>
    </html>
  );
}
