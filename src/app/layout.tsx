import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FaInstagram } from 'react-icons/fa';

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
  title: "Cappadocia Coffee & Bakery",
  description: "Doğal malzemeler ve özel kahvelerle hazırlanan eşsiz lezzetler. Üsküdar'da hizmet veren Cappadocia Coffee & Bakery'de kahveler, tatlılar ve birbirinden lezzetli bakery ürünleri sizi bekliyor.",
  keywords: "cappadocia coffee, bakery, cafe, kahve, tatlı, üsküdar cafe, istanbul cafe",
  authors: [{ name: "Cappadocia Coffee & Bakery" }],
  applicationName: "Cappadocia Coffee & Bakery",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.cappadociacoffee.com",
    languages: {
      "tr": "https://www.cappadociacoffee.com"
    }
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.cappadociacoffee.com",
    title: "Cappadocia Coffee & Bakery",
    description: "Doğal malzemeler ve özel kahvelerle hazırlanan eşsiz lezzetler. Üsküdar'da hizmet veren mekanımızda birbirinden lezzetli seçenekler sizi bekliyor.",
    siteName: "Cappadocia Coffee & Bakery",
    images: [
      {
        url: "https://www.cappadociacoffee.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cappadocia Coffee & Bakery",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cappadocia Coffee & Bakery",
    description: "Doğal malzemeler ve özel kahvelerle hazırlanan eşsiz lezzetler ve bakery ürünleri",
    images: ["https://www.cappadociacoffee.com/images/twitter-image.jpg"],
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_ID",
  },
  creator: "Piston Creative",
  publisher: "Cappadocia Coffee & Bakery",
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
        {/* Fixed Instagram Icon - Updated with Gradient & Increased Size */}
        <a 
          href="https://www.instagram.com/cappadociacoffeebakery/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 hover:brightness-110 transition-all duration-300 flex items-center justify-center text-white shadow-lg hover:scale-110 transform"
        >
          <FaInstagram className="text-3xl" />
        </a>
      </body>
    </html>
  );
}
