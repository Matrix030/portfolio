import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desktop",
  description: "Hyprland-themed portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen overflow-hidden bg-crust">
          {children}
        </div>
      </body>
    </html>
  );
}
