import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FaInstagram } from 'react-icons/fa';
import Chatbot from "@/components/Chatbot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SandWita Sandwich & More",
  description: "Doğal malzemeler ve özel sandviçlerle hazırlanan eşsiz lezzetler. Üsküdar'da hizmet veren SandWita Sandwich & More'da sandviçler, tatlılar ve birbirinden lezzetli bakery ürünleri sizi bekliyor.",
  keywords: "sandwita, sandwich, more, cafe, sandviç, tatlı, üsküdar cafe, istanbul cafe",
  authors: [{ name: "SandWita Sandwich & More" }],
  applicationName: "SandWita Sandwich & More",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.sandwita.com",
    languages: {
      "tr": "https://www.sandwita.com"
    }
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.sandwita.com",
    title: "SandWita Sandwich & More",
    description: "Doğal malzemeler ve özel sandviçlerle hazırlanan eşsiz lezzetler. Üsküdar'da hizmet veren mekanımızda birbirinden lezzetli seçenekler sizi bekliyor.",
    siteName: "SandWita Sandwich & More",
    images: [
      {
        url: "https://www.sandwita.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SandWita Sandwich & More",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SandWita Sandwich & More",
    description: "Doğal malzemeler ve özel sandviçlerle hazırlanan eşsiz lezzetler ve bakery ürünleri",
    images: ["https://www.sandwita.com/images/twitter-image.jpg"],
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_ID",
  },
  creator: "Piston Creative",
  publisher: "SandWita Sandwich & More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-[var(--background)] font-sans overflow-x-hidden w-full`}
      >
        {children}
        <Chatbot />
        {/* Fixed Instagram Icon - Updated with Gradient & Increased Size */}
        <a 
          href="https://www.instagram.com/sandwitaistanbul/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 hover:brightness-110 transition-all duration-300 flex items-center justify-center text-white shadow-lg hover:scale-110 transform"
        >
          <FaInstagram className="text-2xl" />
        </a>
      </body>
    </html>
  );
}
