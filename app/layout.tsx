import type { Metadata } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "600", "900"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mungwariho Shaima Heniriete — Birthday",
  description: "A minimalist editorial birthday tribute for Shaima.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-alabaster text-ink">{children}</body>
    </html>
  );
}
