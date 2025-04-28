'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function MenuPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  // Sayfanın /menu olduğunu kontrol edelim
  useEffect(() => {
    if (pathname === '/menu') {
      // Sayfa yüklendiğinde verilerin kullanılabilir olduğundan emin olalım
      if (categories && categories.length > 0) {
        setIsLoaded(true);
      }
    }
  }, [pathname]);

  // Sayfa geçişlerini iyileştirmek için basit bir preloading işlemi
  useEffect(() => {
    // Kategori resimlerini ön belleğe almak için
    if (categories) {
      categories.forEach((category) => {
        if (category.image) {
          const img = new window.Image();
          img.src = category.image;
        }
      });
    }
  }, []);

  // Client tarafındaki değişiklikleri anında yansıtmak için
  useEffect(() => {
    if (pathname === '/menu') {
      // Bu sayfa açıldığında içeriğin hemen görünmesini sağlayacak
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Sayfanın en üstünden başlayalım
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Menu sekmesini aktifleştirelim ve veri önbelleğini ısıtalım
      try {
        // Önbelleğe alma işlemi tamamlandığında UI güncellemek için
        setTimeout(() => {
          if (!isLoaded && categories.length > 0) {
            setIsLoaded(true);
          }
        }, 100);
      } catch (error) {
        console.error('Menu sayfası yüklenirken hata:', error);
        // Hata durumunda da içeriği gösterelim
        setIsLoaded(true);
      }
    }

    // Temizleme işlevi
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [pathname, isLoaded]);

  return (
    <div className="min-h-screen flex flex-col bg-[#d6cab1]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <section id="menu-kategorilerimiz" className="py-16 bg-[var(--section-bg)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4">
                Menü Kategorilerimiz
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
                Özenle hazırladığımız lezzetlerimizi keşfedin. 
                Her bir kategori, eşsiz tatlar ve özel sunumlar içerir.
              </p>
            </motion.div>

            {!isLoaded ? (
              // Yükleme durumu
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-[var(--text-muted)]">Kategoriler yükleniyor...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05 // Daha hızlı staggering
                    }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 