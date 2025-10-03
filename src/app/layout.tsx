import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EMart - Modern E-commerce Platform",
  description:
    "Experience the future of online shopping with EMart. Fast, secure, and user-friendly e-commerce platform with the latest products at unbeatable prices.",
  keywords:
    "ecommerce, online shopping, electronics, fashion, home, deals, EMart",
  authors: [{ name: "EMart Team" }],
  creator: "EMart",
  openGraph: {
    title: "EMart - Modern E-commerce Platform",
    description: "Experience the future of online shopping with EMart",
    url: "https://emart.com",
    siteName: "EMart",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMart - Modern E-commerce Platform",
    description: "Experience the future of online shopping with EMart",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
