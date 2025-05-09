import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda - SandWita Sandwich & More",
  description: "SandWita Sandwich & More'un hikayesi, misyonu ve vizyonu. Üsküdar'da kaliteli sandviç ve tatlı deneyimi sunan mekanımızı tanıyın.",
  keywords: "sandwita sandwich hakkında, üsküdar cafe, sandviç dükkanı, cafe hikayesi, bakery üsküdar",
  alternates: {
    canonical: "https://www.sandwita.com/about",
  },
  openGraph: {
    title: "Hakkımızda - SandWita Sandwich & More",
    description: "SandWita Sandwich & More'un hikayesi, misyonu ve vizyonu. Kaliteli sandviç ve tatlı deneyimi.",
    url: "https://www.sandwita.com/about",
    images: [
      {
        url: "https://www.sandwita.com/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "SandWita Sandwich & More Hakkında",
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