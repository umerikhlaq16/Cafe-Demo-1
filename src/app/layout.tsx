import type { Metadata } from "next";
import { Geist, Geist_Mono, Jaro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jaro = Jaro({
  variable: "--font-jaro",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Sipora — Fresh Flavor, Better Together",
  description: "Bright, honest fruit refreshment made for good moments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jaro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
