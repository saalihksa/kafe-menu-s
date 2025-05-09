import type { Metadata } from "next";
import { categories } from "@/data/categories";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Slug'a göre kategoriyi bul
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: "Kategori Bulunamadı - SandWita Sandwich & More",
      description: "Aradığınız kategori bulunamadı. Lütfen ana menüye giderek diğer kategorileri inceleyiniz.",
    };
  }
  
  return {
    title: `${category.title} - SandWita Sandwich & More`,
    description: category.description || `${category.title} kategorisindeki ürünlerimizi keşfedin. SandWita Sandwich & More'un lezzetli ${category.title.toLowerCase()} seçenekleri sizi bekliyor.`,
    keywords: `${category.title.toLowerCase()}, sandwita ${category.title.toLowerCase()}, ${category.title.toLowerCase()} menu`,
    alternates: {
      canonical: `https://www.sandwita.com/kategori/${params.slug}`,
    },
    openGraph: {
      title: `${category.title} - SandWita Sandwich & More`,
      description: category.description || `${category.title} kategorisindeki ürünlerimizi keşfedin. Özel seçeneklerimizi inceleyin.`,
      url: `https://www.sandwita.com/kategori/${params.slug}`,
      images: category.image ? [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.title,
        }
      ] : undefined,
    }
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 