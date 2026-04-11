import "./globals.css";

// ============================================
// Root Layout — required by Next.js to hold <html>/<body>
// ============================================
// Next.js 16 strictly requires the ROOT `app/layout.tsx` to own the
// <html>/<body> tags. So we render them here with the Arabic defaults
// (RTL, lang="ar") and then synchronously swap them in the client if
// the URL is under /en/. The inline script runs BEFORE React hydrates
// so there is no flash of wrong direction.

export const metadata = {
  title: "أكاديمية النخلة الدولية — Al-Nakhla International Academy",
  description:
    "مؤسسة تعليمية دولية في عمّان · An international academy in Amman, Jordan.",
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
    <html lang="ar" dir="rtl" className="h-full" data-locale="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
