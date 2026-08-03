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

const title = "Mark Feldman — Agentic Systems Engineer";
const description =
  "Engineering leader — 15+ years in C#/.NET, 12+ leading teams. Track record of installing durable engineering practice where none existed. Looking to help a team adopt agentic AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://markfeldman.work"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://markfeldman.work",
    siteName: "Mark Feldman",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
