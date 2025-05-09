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
  { label: 'Sandviçler', value: 'bakery' },
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
    "name": "SandWita Sandwich & More Menü",
    "url": "https://www.sandwita.com/menu",
    "mainEntityOfPage": "https://www.sandwita.com",
    "inLanguage": "Turkish",
    "hasMenuSection": categories.map(category => ({
      "@type": "MenuSection",
      "name": category.title,
      "description": category.description || "",
      "url": `https://www.sandwita.com/kategori/${category.slug}`
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] relative overflow-hidden">
      <Script
        id="menu-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      
      {/* Arka Plan Statik Sandviç Görselleri */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Alttan yukarı çıkan 25 adet sandviç SVG'si, artırılmış opaklık */}
        {Array.from({ length: 25 }).map((_, index) => {
          const sizeClass = ['w-16 h-16', 'w-20 h-20', 'w-24 h-24', 'w-28 h-28'][Math.floor(Math.random() * 4)];
          const opacityClass = ['opacity-40', 'opacity-50', 'opacity-60', 'opacity-70'][Math.floor(Math.random() * 4)];
          const animationClass = 'animate-float-up-visible-base';
          const svgFiles = [
            '/images/balloon.svg',
            '/images/balloon-blue.svg',
            '/images/balloon-green.svg',
            '/images/balloon-orange.svg',
            '/images/balloon-pink.svg',
            '/images/balloon-purple.svg',
            '/images/balloon-yellow.svg'
          ];
          const randomSvg = svgFiles[Math.floor(Math.random() * svgFiles.length)];
          const animationDelay = Math.random() * 5;
          const positionStyle = {
             // Pozisyonu rastgele ata, animasyon alttan başlatacak
            top: `${Math.pow(Math.random(), 1.5) * 100}%`, // Değişiklik: Üst pozisyon dağılımı güncellendi
            left: `${Math.random() * 90 + 5}%`, // %5 - %95 arası
            animationDelay: `${animationDelay}s`,
            willChange: 'transform, opacity' // Değişiklik: Performans için will-change eklendi
          };

          return (
            <div 
              key={`sandwich-bg-${index}`}
              className={`absolute ${sizeClass} ${opacityClass} ${animationClass} rounded-lg`}
              style={positionStyle}
            >
              <Image 
                src={randomSvg} 
                alt="Arka Plan Sandviç Çizimi"
                width={100} 
                height={100}
                className="w-full h-full object-contain" 
              />
        </div>
          );
        })}
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
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[var(--accent)]/60 blur-2xl -z-10"></div>
                
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
                
                {/* Başlık metni - Güncellenmiş stil */}
                <motion.h2 
                  id="menu-heading"
                  className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[var(--primary)] tracking-normal mb-4 sm:mb-5 text-center relative z-10"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
                >
                Menü Kategorilerimiz
                </motion.h2>
                
                {/* Ayırıcı Çizgi - Renkler zaten değişken kullanıyor, kontrol edildi */}
                <div className="relative w-24 h-1 my-2"> {/* Genişlik azaltıldı, dikey boşluk eklendi */}
                  <motion.div 
                    className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary-dark)] to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  ></motion.div>
                   <motion.div 
                    className="absolute inset-0 top-[3px] h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80%", opacity: 0.7, x: "10%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                </div>
                
                {/* Dekoratif vurgu - Konum ve stil ayarlandı */}
                <motion.div 
                  className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-[var(--primary)]/5 opacity-10 blur-3xl -z-10"
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

            {/* Filtre Butonları - Eşit Genişlik, Büyütülmüş, Arası Açılmış */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center sm:justify-center flex-wrap gap-3 sm:gap-5 mb-10 sm:mb-12 relative z-10"
            >
              {filters.map((filter, index) => (
                <motion.button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex-1 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-dark)] text-center whitespace-nowrap ${
                    selectedFilter === filter.value
                      ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                      : 'bg-white/80 text-[#5c4d42] hover:bg-white'
                  }`}
                  aria-pressed={selectedFilter === filter.value}
                  aria-label={`${filter.label} kategorilerini filtrele`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {filter.label}
                </motion.button>
              ))}
            </motion.div>

            {!isLoaded ? (
              // Geliştirilmiş yükleme durumu
              <div className="flex flex-col items-center justify-center py-8 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
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
                  <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent-dark)]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary-dark)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-[var(--primary-dark)]">Kategoriye tıklayarak tüm ürünleri görüntüleyebilirsiniz</span>
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