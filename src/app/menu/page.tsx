'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

// Filtre butonları için tip tanımı
type FilterType = 'all' | 'icecekler' | 'tatlilar' | 'bakery';

// Filtre butonlarının tanımları
const filters: { label: string; value: FilterType }[] = [
  { label: 'Tümü', value: 'all' },
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

  // Kafe için JSON-LD verisi
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Cappadocia Coffee & Bakery Menü",
    "url": "https://www.cappadociacoffee.com/menu",
    "mainEntityOfPage": "https://www.cappadociacoffee.com",
    "inLanguage": "Turkish",
    "hasMenuSection": categories.map(category => ({
      "@type": "MenuSection",
      "name": category.title,
      "description": category.description || "",
      "url": `https://www.cappadociacoffee.com/kategori/${category.slug}`
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d6cab1] relative overflow-hidden">
      <Script
        id="menu-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      
      {/* Arka Plan Sıcak Hava Balonları - Hepsi Kahverengi */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* 1. Balon (Görünür Başla) */}
        <div className="absolute top-[8%] right-[5%] w-20 sm:w-24 h-28 sm:h-36 opacity-30 animate-float-up-visible-1">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 2. Balon (Görünür Başla) */}
        <div className="absolute top-[15%] left-[8%] w-16 sm:w-20 h-24 sm:h-32 opacity-25 animate-float-up-visible-2">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 3. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[40%] left-[5%] w-24 sm:w-28 h-36 sm:h-44 opacity-0 animate-float-up-3">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 4. Balon (Görünür Başla) */}
        <div className="absolute top-[25%] right-[12%] w-16 sm:w-20 h-24 sm:h-32 opacity-30 animate-float-up-visible-3">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 5. Balon (Görünür Başla) */}
        <div className="absolute top-[35%] left-[15%] w-16 sm:w-20 h-24 sm:h-28 opacity-25 animate-float-up-visible-4">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 6. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[60%] right-[20%] w-12 sm:w-14 h-16 sm:h-20 opacity-0 animate-float-up-6">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 7. Balon (Görünür Başla) */}
        <div className="absolute top-[18%] left-[40%] w-8 sm:w-10 h-12 sm:h-16 opacity-20 animate-float-up-visible-5">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 8. Balon (Görünür Başla) */}
        <div className="absolute top-[10%] right-[25%] w-12 sm:w-14 h-16 sm:h-20 opacity-25 animate-float-up-visible-6">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 9. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[70%] left-[10%] w-10 sm:w-12 h-14 sm:h-16 opacity-0 animate-float-up-9">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 10. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[65%] left-[40%] w-12 sm:w-14 h-16 sm:h-20 opacity-0 animate-float-up-10">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 11. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[45%] right-[8%] w-10 sm:w-12 h-14 sm:h-16 opacity-0 animate-float-up-1" style={{ animationDelay: '4s' }}>
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 12. Balon (Görünür Başla) */}
        <div className="absolute top-[5%] left-[25%] w-14 sm:w-16 h-20 sm:h-24 opacity-30 animate-float-up-visible-7">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 13. Balon (Görünür Başla) */}
        <div className="absolute top-[30%] right-[3%] w-8 sm:w-10 h-12 sm:h-16 opacity-20 animate-float-up-visible-8">
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 14. Balon (Aşağıdan Başla) */}
        <div className="absolute top-[55%] left-[2%] w-10 sm:w-12 h-14 sm:h-16 opacity-0 animate-float-up-4" style={{ animationDelay: '19s' }}>
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        
        {/* 15. Balon (Görünür Başla) */}
        <div className="absolute top-[20%] left-[20%] w-16 sm:w-20 h-24 sm:h-32 opacity-40 animate-float-up-visible-1" style={{ animationDelay: '1s' }}> {/* Yeni animasyon ve farklı delay */}
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>

        {/* Ekstra Balonlar (Aşağıdan Başla) */}
        <div className="absolute top-[75%] left-[30%] w-12 sm:w-14 h-16 sm:h-20 opacity-0 animate-float-up-6" style={{ animationDelay: '29s' }}>
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        <div className="absolute top-[80%] right-[40%] w-10 sm:w-12 h-14 sm:h-16 opacity-0 animate-float-up-7" style={{ animationDelay: '34s' }}>
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
        <div className="absolute top-[85%] left-[60%] w-14 sm:w-16 h-20 sm:h-24 opacity-0 animate-float-up-8" style={{ animationDelay: '39s' }}>
          <Image src="/images/balloon-blue.svg" alt="" width={100} height={150} className="w-full h-full" />
        </div>
      </div>
      
      <Navbar />
      
      <main className="flex-1 pt-16 sm:pt-24 pb-16 relative z-10">
        <section id="menu-kategorilerimiz" className="py-8 sm:py-16 bg-transparent" aria-labelledby="menu-heading">
          <div className="container mx-auto px-4">
            {/* Başlık bölümü */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 sm:mb-20 relative"
            >
              <div className="relative flex flex-col items-center">
                {/* Dekoratif arka plan elemanları */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#e7e1d4]/60 blur-2xl -z-10"></div>
                
                {/* Parıltı efekti */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white opacity-0 rounded-full blur-3xl -z-5"
                  animate={{ 
                    opacity: [0, 0.03, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Başlık metni - Hafif animasyon eklendi */}
                <motion.h2 
                  id="menu-heading"
                  className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-[#4a4a4a] tracking-tight mb-4 sm:mb-5 text-center relative z-10"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
                  style={{
                    textShadow: "0px 1px 2px rgba(255,255,255,0.5), 0px 3px 5px rgba(0,0,0,0.1)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Menü Kategorilerimiz
                </motion.h2>
                
                {/* Ayırıcı Çizgi - Daha stilize */}
                <div className="relative w-24 h-1 my-2"> {/* Genişlik azaltıldı, dikey boşluk eklendi */}
                  <motion.div 
                    className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-[#9a8a6c] to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  ></motion.div>
                   <motion.div 
                    className="absolute inset-0 top-[3px] h-[1px] bg-gradient-to-r from-transparent via-[#b8a88a]/50 to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80%", opacity: 0.7, x: "10%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                </div>
                
                {/* Dekoratif vurgu - Konum ve stil ayarlandı */}
                <motion.div
                  className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-[#8a6e57]/5 opacity-10 blur-3xl -z-10"
                  style={{ 
                    top: "calc(50% - 40px)", 
                    left: "calc(50% - 80px)",
                  }}
                  animate={{ 
                    scale: [1, 1.03, 1],
                    opacity: [0.05, 0.08, 0.05]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Hızlı Erişim Filtre Butonları - geliştirilmiş */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-12 px-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              {filters.map((filter, index) => (
                <motion.button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform ${
                    selectedFilter === filter.value
                      ? 'bg-[#8a6e57] text-white scale-105 shadow-md border border-[#8a6e57]/20' 
                      : 'bg-white/70 text-[#5f5f5f] hover:bg-white hover:text-[#3d3d3d] hover:scale-105 shadow-sm border border-white/10'
                  }`}
                  aria-pressed={selectedFilter === filter.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8 + (index * 0.05)
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {filter.label}
                </motion.button>
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