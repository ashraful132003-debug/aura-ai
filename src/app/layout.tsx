import type { Metadata, Viewport } from 'next';
import { Fraunces, Outfit } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const SITE_URL = 'https://ashraful132003-debug.github.io/aura-ai/';
const TITLE = 'Aura AI — Mental Wellness for Everyone';
const DESCRIPTION =
  'Aura AI — a safe, private mental wellness companion. Talk to an AI that listens, breathe, track your mood, and heal — anytime, in six interface languages.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Aura AI',
  authors: [{ name: 'Aura AI' }],
  openGraph: {
    type: 'website',
    title: TITLE,
    description:
      'A private, multilingual AI wellness companion — empathetic chat, synthesized soundscapes, breathing coach, mood analytics dashboard. 100% in-browser.',
    url: SITE_URL,
    siteName: 'Aura AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'A private, multilingual AI wellness companion — chat, soundscapes, breathing coach, and a live analytics dashboard.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Aura AI',
  },
};

export const viewport: Viewport = {
  themeColor: '#070B14',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
