/* eslint-disable */
'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import menuData from '@/data/menu';
import categories, { Category } from '@/data/categories';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Tüm dinamik parametrelerin oluşturulmasına izin vermek için
export const dynamic = 'force-dynamic';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const slug = params.slug; // Slug'ı bir değişkene alalım
  
  // useEffect ile sayfa yüklendiğinde kontrol yapalım
  useEffect(() => {
    // Kategori kontrolü
    const category = categories.find((c: Category) => c.slug === slug);
    if (!category) {
      notFound();
    }
  }, [slug]);
  
  const category = categories.find((c: Category) => c.slug === slug);
  
  // Eğer kategori yoksa, notFound işlemi useEffect içinde yapılacak
  if (!category) {
    // Client-side olduğu için burada bir fallback UI döndürelim
    return <div className="min-h-screen flex flex-col items-center justify-center">Yükleniyor...</div>;
  }

  // Menü verilerinden bu kategoriye ait olanları filtreleme
  const filteredItems = menuData
    .flatMap((menuCategory) => menuCategory.items)
    .filter((item) => {
      // Slug değerine göre doğrudan filtreleme yapıyoruz
      return item.category === slug;
    });

  return (
    <div className="min-h-screen flex flex-col bg-[#e7e1d4]">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(33,33,33,0.2)] to-[rgba(33,33,33,0.1)] z-10"></div>
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
      <motion.div 
        className="fixed top-20 left-4 z-[51] sm:left-4 md:left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button 
          onClick={(e) => {
            e.preventDefault();
            router.push('/menu');
          }}
          className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/90 hover:bg-white text-[#8a6e57] hover:text-[#6b563f] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm font-medium border border-[#d6cab1]/20"
        >
          <motion.div 
            className="flex items-center justify-center"
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-[#6b563f] transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <span className="text-sm sm:text-base group-hover:font-semibold transition-all">Geri Dön</span>
        </button>
      </motion.div>
      
      <main className="flex-1 py-8 sm:py-10 md:py-12 px-4 bg-[#e7e1d4] -mt-10 relative z-30 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          {/* Başlık alanı - Görseldeki gibi modern tasarım */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ürün sayısı - Üstte ortalanmış */}
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <div className="inline-block mb-4 bg-[#d6cab1] text-[#4a4a4a] text-xs uppercase tracking-wider py-1.5 px-4 rounded-full font-medium shadow-sm">
                {filteredItems.length} ÜRÜN
              </div>
              
              {/* Görseldeki gibi altı sarı çizgili başlık - Tam ortalanmış */}
              <h1 className="text-center text-[42px] md:text-[60px] font-display font-bold text-[#3d3d3d] relative inline-block mx-auto">
                {category.title}
                <div className="absolute -bottom-3 left-0 w-full h-1.5 bg-[#e9c46a]"></div>
              </h1>
            </div>
            
            {/* Kategori açıklaması - Ortalanmış */}
            {category.description && (
              <motion.p 
                className="text-center text-lg sm:text-xl text-[#696969] leading-relaxed mt-4 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {category.description}
              </motion.p>
            )}
          </motion.div>

          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 auto-rows-fr"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="h-full"
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 px-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 