// Next.js App Router'da dinamik route'lar için otomatik tip tanımlaması ekleyelim
import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import menuData from '@/data/menu';
import categories, { Category } from '@/data/categories';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Tüm dinamik parametrelerin oluşturulmasına izin vermek için
export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = params.slug;
  
  // Kategori kontrolü
  const category = categories.find((c: Category) => c.slug === slug);
  if (!category) {
    notFound();
  }

  // Menü verilerinden bu kategoriye ait olanları filtreleme
  const filteredItems = menuData
    .flatMap((menuCategory) => menuCategory.items)
    .filter((item) => {
      // Slug değerine göre doğrudan filtreleme yapıyoruz
      return item.category === slug;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e7e1d4]">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(33,33,33,0.4)] to-[rgba(33,33,33,0.2)] z-10"></div>
        {category.image ? (
          <Image 
            src={category.image} 
            alt={category.title} 
            fill 
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#d6cab1] to-[#e7e1d4]"></div>
        )}
      </div>

      {/* Sabit Ana Sayfaya Dön butonu */}
      <div 
        className="fixed top-20 left-4 z-40 sm:left-4 md:left-6"
      >
        <a 
          href="/menu"
          className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/90 hover:bg-white text-[#8a6e57] hover:text-[#6b563f] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm font-medium border border-[#d6cab1]/20"
        >
          <div 
            className="flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-[#6b563f] transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm sm:text-base group-hover:font-semibold transition-all">Geri Dön</span>
        </a>
      </div>
      
      <main className="flex-1 py-6 sm:py-8 md:py-12 px-4 bg-[#e7e1d4] -mt-10 relative z-30 rounded-t-3xl">
        <div className="max-w-7xl mx-auto">
          <div
            className="mb-8 sm:mb-10 text-center sm:text-left"
          >
            <div className="inline-block mb-2">
              <span className="bg-[#d6cab1] text-primary text-xs uppercase tracking-wider py-1 px-3 rounded-full font-medium">
                {filteredItems.length} Ürün
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-3 relative">
              {category.title}
              <span className="absolute -bottom-2 left-1/2 sm:left-0 w-16 h-1 bg-accent transform -translate-x-1/2 sm:translate-x-0"></span>
            </h1>
            {category.description && (
              <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mt-4">
                {category.description}
              </p>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7"
            >
              {filteredItems.map((item) => (
                <div key={item.id}>
                  <MenuCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="text-center py-16 px-4 bg-[#d6cab1] rounded-xl shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#8a6e57] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-primary font-medium mb-2">
                Bu kategoride henüz ürün bulunmamaktadır.
              </p>
              <p className="text-[var(--text-muted)] mb-4">Daha sonra tekrar kontrol edebilirsiniz.</p>
              <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition duration-200">
                Diğer Kategorilere Göz At
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 