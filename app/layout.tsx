import './globals.css';

import { GeistSans } from 'geist/font/sans';

let title = 'Swapper - Find teachers in Thailand';
let description =
  'Swapper - Helping you connect with teachers in Thailand for smooth school transitions.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
