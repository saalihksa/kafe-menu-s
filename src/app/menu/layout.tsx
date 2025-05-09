import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menü - SandWita Sandwich & More",
  description: "SandWita Sandwich & More'un özel sandviç çeşitleri, tatlılar ve bakery ürünlerinin yer aldığı menümüzü inceleyin.",
  keywords: "sandwita menu, kafe menü, sandviç menu, bakery menu, tatlı menü",
  alternates: {
    canonical: "https://www.sandwita.com/menu",
  },
  openGraph: {
    title: "Menü - SandWita Sandwich & More",
    description: "Özel sandviç çeşitlerimiz, tatlılarımız ve bakery ürünlerimizin yer aldığı menümüzü inceleyin.",
    url: "https://www.sandwita.com/menu",
  }
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 