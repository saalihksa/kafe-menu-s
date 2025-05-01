import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menü - Cappadocia Coffee & Bakery",
  description: "Cappadocia Coffee & Bakery'nin özel kahve çeşitleri, tatlılar ve bakery ürünlerinin yer aldığı menümüzü inceleyin.",
  keywords: "cappadocia menu, kafe menü, kahve menu, bakery menu, tatlı menü",
  alternates: {
    canonical: "https://www.cappadociacoffee.com/menu",
  },
  openGraph: {
    title: "Menü - Cappadocia Coffee & Bakery",
    description: "Özel kahve çeşitlerimiz, tatlılarımız ve bakery ürünlerimizin yer aldığı menümüzü inceleyin.",
    url: "https://www.cappadociacoffee.com/menu",
  }
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 