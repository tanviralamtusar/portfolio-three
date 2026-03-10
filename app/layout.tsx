import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

import localFont from 'next/font/local'
import { LenisProvider } from "@/components/providers/LenisProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const futura = localFont({
  src: './fonts/Futura-Bold.woff2', // Path to your file
  variable: '--font-futura',           // Optional: CSS variable name
  display: 'swap',
})
const social = localFont({
  src: './fonts/ABCSocialMono-Regular.woff2', // Path to your file
  variable: '--font-social',           // Optional: CSS variable name
  display: 'swap',
})


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A Personal Animated Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} $ ${social.variable} ${outfit.variable} ${futura.variable}  ${geistMono.variable} antialiased`}
      >

        <LenisProvider>
          {children}
        </LenisProvider>



      </body>
    </html>
  );
}
