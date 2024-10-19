import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Join the ThumbForgeAi Waitlist - AI-powered YouTube Thumbnail Generator",
  description: "Sign up for early access to ThumbForgeAi, the AI-powered tool designed to create stunning YouTube thumbnails in seconds. Be among the first to experience our revolutionary thumbnail generator!",

  metadataBase: new URL("https://waitlist.quillstash.com"),
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waitlist.quillstash.com',
    title: 'ThumbForgeAi Waitlist',
    description: 'Get early access to ThumbForgeAi, the AI-powered tool for creating high-quality YouTube thumbnails with ease.',
    siteName: 'ThumbForgeAi Waitlist',
    images: [
      {
        url: 'https://waitlist.quillstash.com/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ThumbForgeAi Waitlist - AI-powered Thumbnail Generator',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@DobaIbrahim',
    title: 'ThumbForgeAi Waitlist ',
    description: 'Sign up for early access to ThumbForgeAi, the AI-powered tool for creating professional YouTube thumbnails with ease.',
    images: ['https://waitlist.quillstash.com/assets/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
   
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
