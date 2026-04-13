import "./globals.css";

// ============================================
// Root Layout — Dar Al-Maskan
// ============================================

export const metadata = {
  title: "دار المسكن — Dar Al-Maskan",
  description:
    "دار المسكن — عقارات فاخرة في عمّان، الأردن | Dar Al-Maskan — Luxury Real Estate in Amman, Jordan",
  keywords: [
    "Dar Al-Maskan",
    "دار المسكن",
    "luxury real estate Amman",
    "عقارات فاخرة عمان",
  ],
};

const localeInitScript = `
(function() {
  try {
    var path = window.location.pathname;
    var match = path.match(/\\/(ar|en)(?:\\/|$)/);
    if (match) {
      var locale = match[1];
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('data-locale', locale);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Readex+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-base">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
