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
  metadataBase: new URL("https://www.theoxybrief.com"),

  title: "The OXY Brief",

  description:
    "The OXY Brief translates sustainability into financial performance through ESG advisory, OXY 60, OXY Explains, and The OXY Model.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "The OXY Brief",
    description:
      "Translating sustainability into financial performance.",
    url: "https://www.theoxybrief.com",
    siteName: "The OXY Brief",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The OXY Brief",
    description:
      "Translating sustainability into financial performance.",
  },

  robots: {
    index: true,
    follow: true,
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
