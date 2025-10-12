import type { Metadata } from 'next';
import './globals.css';
import { HeaderWithSearch } from '@/components/layout/header-with-search';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ZoneProvider } from '@/contexts/zone-context';
import { QueryProvider } from '@/components/providers/query-provider';

export const metadata: Metadata = {
  title: 'CercaDeTi - Explora los negocios cerca de ti',
  description: 'Búsqueda de negocios/servicios cerca de ti.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/cercadeti-naranja.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/cercadeti-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/cercadeti-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CercaDeTi',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f86530',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/cercadeti-naranja.ico" sizes="32x32" />
        <link rel="icon" href="/cercadeti-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/cercadeti-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f86530" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CercaDeTi" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <QueryProvider>
          <ZoneProvider>
            <HeaderWithSearch />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
            <SpeedInsights />
          </ZoneProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
