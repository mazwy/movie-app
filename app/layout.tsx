import './globals.css';

import { GeistSans } from 'geist/font/sans';
import React from "react";

let title = '(TIN PROJECT) Movie app';
let description =
  'Tin project - basically rotten tomatoes on steroids.';

export const metadata = {
  title,
  description,
  metadataBase: new URL('https://github.com/mazwy'),
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
