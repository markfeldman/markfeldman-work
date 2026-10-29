import type { Metadata } from "next";
import "./globals.css";

const title = "Mark Feldman - Haunted Game Studio and MACK";
const description =
  "I am building Haunted Game Studio and MACK: a working game studio and the agentic control plane designed to make its specialist teams repeatable, reviewable, and safe to direct.";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
