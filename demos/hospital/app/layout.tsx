import "./globals.css";

// ============================================
// Root Layout — Royal Medical Center
// ============================================
// Next.js 16 requires the ROOT `app/layout.tsx` to own <html>/<body>.
// We render with Arabic defaults (RTL, lang="ar") and then
// synchronously swap via inline script before React hydrates.

export const metadata = {
  title: "المركز الطبي الملكي — Royal Medical Center",
  description:
    "المركز الطبي الملكي — رعاية صحية متميزة في عمّان، الأردن | Royal Medical Center — Premium Healthcare in Amman, Jordan",
  keywords: [
    "Royal Medical Center",
    "المركز الطبي الملكي",
    "hospital Amman",
    "مستشفى عمان",
    "healthcare Jordan",
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
    <html lang="ar" dir="rtl" className="h-full" data-locale="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Readex+Pro:wght@300;400;500;600;700&display=swap"
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
