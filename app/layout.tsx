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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
