import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Nakhla International Academy — Where Excellence Takes Root",
  description:
    "A premier K-12 international academy in Amman, Jordan. Bilingual education, world-class facilities, and a nurturing environment for every student.",
  keywords: [
    "Al-Nakhla Academy",
    "International School Amman",
    "Private School Jordan",
    "K-12 Education Jordan",
    "Bilingual School Amman",
  ],
  openGraph: {
    title: "Al-Nakhla International Academy",
    description: "Where Excellence Takes Root",
    type: "website",
    siteName: "Al-Nakhla International Academy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..700&family=Noto+Sans+Arabic:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
