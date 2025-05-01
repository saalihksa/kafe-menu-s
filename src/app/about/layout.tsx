import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda - Cappadocia Coffee & Bakery",
  description: "Cappadocia Coffee & Bakery'nin hikayesi, misyonu ve vizyonu. Üsküdar'da kaliteli kahve ve tatlı deneyimi sunan mekanımızı tanıyın.",
  keywords: "cappadocia coffee hakkında, üsküdar cafe, kahve dükkanı, cafe hikayesi, bakery üsküdar",
  alternates: {
    canonical: "https://www.cappadociacoffee.com/about",
  },
  openGraph: {
    title: "Hakkımızda - Cappadocia Coffee & Bakery",
    description: "Cappadocia Coffee & Bakery'nin hikayesi, misyonu ve vizyonu. Kaliteli kahve ve tatlı deneyimi.",
    url: "https://www.cappadociacoffee.com/about",
    images: [
      {
        url: "https://www.cappadociacoffee.com/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cappadocia Coffee & Bakery Hakkında",
      }
    ],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 