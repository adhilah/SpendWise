import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spend Wise",
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Inter - main UI font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Geist Mono - for accent / mono text (NEW EXPENSE label etc.) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
  rel="stylesheet"
/>
        {/* Material Symbols Outlined - for category icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />

        {/* Important for proper mobile scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* You can add favicon later */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>

      <body>{children}</body>
    </html>
  );
}