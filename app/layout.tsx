import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hire HubSpot Developers",
  description: "Hire certified HubSpot developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <style>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-display: 'Satoshi', 'Inter', system-ui, sans-serif;
          }
          @font-face {
            font-family: 'Satoshi';
            src: url('/fonts/satoshi-regular.woff2') format('woff2');
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: 'Satoshi';
            src: url('/fonts/satoshi-bold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
