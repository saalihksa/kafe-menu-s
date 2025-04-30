'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Filtre butonları için tip tanımı
type FilterType = 'all' | 'kahveler' | 'icecekler' | 'tatlilar' | 'bakery';

// Filtre butonlarının tanımları
const filters: { label: string; value: FilterType }[] = [
  { label: 'Tümü', value: 'all' },
  { label: 'Kahveler', value: 'kahveler' },
  { label: 'İçecekler', value: 'icecekler' },
  { label: 'Tatlılar', value: 'tatlilar' },
  { label: 'Bakery', value: 'bakery' },
];

export default function MenuPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const pathname = usePathname();

  // Sayfanın /menu olduğunu kontrol edelim
  useEffect(() => {
    if (pathname === '/menu') {
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

  // Filtrelenmiş kategorileri hesapla
  const filteredCategories = useMemo(() => {
    if (selectedFilter === 'all') {
      return categories;
    }
    return categories.filter(category => category.group === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#d6cab1]">
      <Navbar />
      
      <main className="flex-1 pt-16 sm:pt-24 pb-16">
        <section id="menu-kategorilerimiz" className="py-8 sm:py-16 bg-[var(--section-bg)]" aria-labelledby="menu-heading">
          <div className="container mx-auto px-4">
            {/* Başlık bölümü */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 sm:mb-16"
            >
              <div className="relative flex flex-col items-center">
                {/* Dekoratif arka plan elemanları */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full bg-[#e7e1d4]/50 blur-xl -z-10"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rotate-12 w-32 h-1 bg-[#b8a88a]/30"></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -rotate-12 w-40 h-1 bg-[#9a8a6c]/30"></div>
                
                {/* Başlık ikonu - mobilde küçültüldü */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#b8a88a] to-[#d6cab1] shadow-lg flex items-center justify-center mb-4 sm:mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                {/* Başlık metni - mobilde küçültüldü */}
                <motion.h2 
                  id="menu-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#8a6e57] tracking-tight mb-3 sm:mb-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                Menü Kategorilerimiz
                </motion.h2>
                
                {/* Alt çizgi efekti */}
                <div className="relative h-2 w-36 sm:w-48 mb-4 sm:mb-6">
                  <motion.div 
                    className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-[#b8a88a] to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  ></motion.div>
                </div>
                
                {/* İlgi çekici rozet */}
                <motion.div 
                  className="bg-gradient-to-r from-[#9a8a6c] to-[#b8a88a] text-white text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  aria-label={`${categories.length} farklı menü kategorisi sunuyoruz`}
                >
                  {categories.length} Farklı Kategori
                </motion.div>
              </div>
            </motion.div>

            {/* Hızlı Erişim Filtre Butonları */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${ 
                    selectedFilter === filter.value
                      ? 'bg-[#8a6e57] text-white scale-105 shadow-md' 
                      : 'bg-white/60 text-[#5f5f5f] hover:bg-white/90 hover:text-[#3d3d3d]'
                  }`}
                  aria-pressed={selectedFilter === filter.value}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>

            {!isLoaded ? (
              // Geliştirilmiş yükleme durumu
              <div className="flex flex-col items-center justify-center py-8 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#e9c46a]/30 border-t-[#e9c46a] rounded-full animate-spin mb-4"></div>
                <p className="text-[#5f5f5f] text-center mb-1">Lezzetli kategoriler yükleniyor</p>
                <p className="text-xs text-[#7f7f7f] text-center">Lütfen bekleyin...</p>
              </div>
            ) : (
              <>
                {/* Kategori Kartları */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-1"
                >
                  {filteredCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05 
                      }}
                      className="h-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px]"
                    >
                      <CategoryCard category={category} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Kategori ipuçları - Büyük ekranlarda görünür */}
                <motion.div 
                  className="hidden md:block mt-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <p className="text-sm text-[#666666] mb-2">Detaylı menü için istediğiniz kategoriyi seçin</p>
                  <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#e9c46a]/10 border border-[#e9c46a]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8a6e57] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-[#8a6e57]">Kategoriye tıklayarak tüm ürünleri görüntüleyebilirsiniz</span>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 