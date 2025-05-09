'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  // Müşteri memnuniyeti sayacı için state
  const [counter, setCounter] = useState(0);
  const [yearCount, setYearCount] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  // Sayacı başlat - müşteri memnuniyeti
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter < 100) {
            return prevCounter + 1;
          }
          clearInterval(interval);
          return 100;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  // Yıl sayacı animasyonu
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setYearCount(prevCount => {
          if (prevCount < 5) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return 5;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  // Kahve çeşidi sayacı animasyonu
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCoffeeCount(prevCount => {
          if (prevCount < 25) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return 25;
        });
      }, 80);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  // Şube sayacı animasyonu
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setBranchCount(prevCount => {
          if (prevCount < 1) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return 1;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Fade-in animasyonu için varyantlar
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Staggered fade-in animasyonu için varyantlar
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Sayı animasyonu için varyant
  const counterAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  // Görselleri preload etmek için
  useEffect(() => {
    // Sayfadaki görselleri önceden yükleyelim
    const imageUrls = [
      '/images/about-hero.jpg',
      '/images/about-story.jpg',
      '/images/about-team.jpg'
    ];
    
    // Hemen yüklemeye başla
    imageUrls.forEach(url => {
      const img = new window.Image();
      img.src = url;
      // İmajı tarayıcı önbelleğine almak için
      img.fetchPriority = 'high';
    });
    
    // Hikaye görseli için özel preload
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = '/images/about-story.jpg';
    document.head.appendChild(preloadLink);
    
    return () => {
      // Temizlik işlemi
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f6f0] to-[#f1eee6]">
      <Navbar />
      
      {/* Hero Bölümü */}
      <div className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 z-10"></div>
        <Image
          src="/images/about-hero.jpg" 
          alt="Cappadocia Coffee" 
          fill
          className="object-cover object-center scale-105 motion-safe:animate-subtle-zoom" 
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Hakkımızda
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="w-32 h-[2px] bg-[#e9c46a] mx-auto mb-8"
            ></motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide mb-6"
            >
              2018'den bu yana kahve tutkunlarına eşsiz deneyimler sunuyoruz. Tutkumuz, her bir fincanda ve her bir lokmada hissedilir.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-light tracking-wider"
            >
              Kaliteli malzemeler, özenli tarifler ve sıcacık bir atmosferle sizlerleyiz.
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* İçerik Bölümü */}
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hikayemiz Bölümü */}
          <motion.section 
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="max-w-xl">
                  <span className="text-[#e9c46a] text-xs font-semibold tracking-[0.3em] uppercase mb-4 inline-block">Hikayemiz</span>
                  <h2 className="text-5xl font-display font-bold text-[#2d2d2d] mb-4 leading-tight">
                    Her fincanda <br /><span className="text-[#5f5f5f]">bir hikaye</span>
                  </h2>
                  <p className="italic text-gray-600 mb-10 text-lg">Bir tutkunun ve özenin eseri...</p>
                  
                  <div className="space-y-6 text-[#4d4d4d] mb-12 text-lg">
                    <p className="leading-relaxed tracking-normal">
                      2018'de Üsküdar'da bir hayalle başlayan SandWita Sandwich & More, kaliteli malzemeler, modern sunumlar ve sıcak bir atmosferle eşsiz bir sandviç deneyimi sunmayı amaçladı. Her sandvicin bir hikaye anlatması, her lokmanın damaklarda iz bırakması temel ilkemiz oldu.
                    </p>
                    <p className="leading-relaxed tracking-normal">
                      Bugün, özenle seçilmiş kahvelerimiz, taptaze lezzetlerimiz ve samimi ortamımızla bölgenin sevilen buluşma noktasıyız.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e9c46a]/10">
                  <div className="absolute inset-0 shadow-[inset_0px_0px_100px_rgba(0,0,0,0.2)] z-10 rounded-2xl"></div>
                  
                  {/* Görsel yüklenene kadar placeholder göster */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#f1eee6] z-[5]">
                    <div className="w-10 h-10 border-4 border-[#e9c46a] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  
                  <Image 
                    src="/images/about-story.jpg" 
                    alt="Kafemizin hikayesi" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700 z-[8]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                    fetchPriority="high"
                    onLoadingComplete={(img) => {
                      // Görsel yüklendiğinde placeholder'ı gizle
                      const parent = img.parentElement;
                      if (parent) {
                        const placeholder = parent.querySelector('div:nth-child(2)');
                        if (placeholder && placeholder instanceof HTMLElement) {
                          placeholder.style.display = 'none';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Müşteri Memnuniyeti Sayacı Bölümü - İstatistikler tek satıra alındı */}
          <motion.section 
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            ref={statsRef}
          >
            <div className="bg-[#f8f4ea] rounded-2xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center justify-center mb-2">
                {/* Yıldızlar üstte */}
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#e9c46a] mx-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Büyük yüzde gösterimi animasyonlu */}
                <motion.h2 
                  className="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-[#3a3a3a] mb-2"
                  variants={counterAnimation}
                >
                  %{counter}
                </motion.h2>
                
                {/* Başlık */}
                <p className="text-[#696969] mb-6 text-lg sm:text-xl">Müşteri Memnuniyeti</p>
                
                {/* İlerleme çubuğu */}
                <div className="w-full max-w-[300px] sm:max-w-[400px] bg-white rounded-full h-1 overflow-hidden mb-10">
                  <div 
                    className="bg-[#e9c46a] h-1 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${counter}%` }}
                  ></div>
                </div>
              </div>
              
              {/* İstatistikler - Tek satırda */}
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-[#e9c46a]/30 pt-10">
                <motion.div 
                  className="flex flex-col items-center border-r border-[#e9c46a]/30 last:border-r-0 pr-4"
                  variants={counterAnimation}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3a3a3a] block mb-1">{yearCount}+</span>
                  <span className="text-[#696969] text-sm sm:text-base text-center">Yıllık Deneyim</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center border-r border-[#e9c46a]/30 last:border-r-0 pr-4"
                  variants={counterAnimation}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3a3a3a] block mb-1">{coffeeCount}+</span>
                  <span className="text-[#696969] text-sm sm:text-base text-center">Kahve Çeşidi</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  variants={counterAnimation}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#3a3a3a] block mb-1">{branchCount}</span>
                  <span className="text-[#696969] text-sm sm:text-base text-center">Şube</span>
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          {/* Misafir Görüşleri Bölümü */}
          <motion.section
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-[#e9c46a] text-xs font-semibold tracking-[0.3em] uppercase mb-4 inline-block">Misafirlerimizden</span>
                <h2 className="text-5xl font-display font-bold text-[#2d2d2d] mb-6">Neler Söylüyorlar?</h2>
                <div className="w-20 h-[2px] bg-[#e9c46a]/50 mx-auto mb-6"></div>
                <p className="text-[#666] max-w-lg mx-auto text-lg">Değerli misafirlerimizin deneyimleri ve düşünceleri</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="bg-white p-10 rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative before:content-['❞'] before:absolute before:top-6 before:right-8 before:text-6xl before:text-[#e9c46a]/10 before:font-serif">
                  <div className="flex items-center mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#e9c46a]/15 flex items-center justify-center mr-4 shadow-sm">
                      <span className="text-[#e9c46a] font-medium">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2d2d2d] text-lg">Ahmet Y.</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#e9c46a]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#555] mb-6 text-lg leading-relaxed relative z-10">
                    "Kahveleri gerçekten harika! Çalışanların samimiyeti ve lezzetli atıştırmalıkları ile tam bir kahve deneyimi sunuyorlar. Her ziyaretimde farklı bir kahve denemek için sabırsızlanıyorum."
                  </p>
                  <p className="text-[#999] text-sm relative z-10">1 ay önce</p>
                </div>
                
                <div className="bg-white p-10 rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative before:content-['❞'] before:absolute before:top-6 before:right-8 before:text-6xl before:text-[#e9c46a]/10 before:font-serif">
                  <div className="flex items-center mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#e9c46a]/15 flex items-center justify-center mr-4 shadow-sm">
                      <span className="text-[#e9c46a] font-medium">Z</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2d2d2d] text-lg">Zeynep K.</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#e9c46a]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#555] mb-6 text-lg leading-relaxed relative z-10">
                    "Kahvaltı için gittiğimiz en iyi yerlerden birisi. Özellikle bazlama tostlarını kesinlikle denemelisiniz! Ortam çok ferah ve rahat, çalışmak için de ideal bir mekan."
                  </p>
                  <p className="text-[#999] text-sm relative z-10">2 hafta önce</p>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* İletişim Bölümü */}
          <motion.section
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="text-center mb-20">
              <span className="text-[#e9c46a] text-xs font-semibold tracking-[0.3em] uppercase mb-4 inline-block">İletişim</span>
              <h2 className="text-5xl font-display font-bold text-[#2d2d2d] mb-6">Bize Ulaşın</h2>
              <div className="w-20 h-[2px] bg-[#e9c46a]/50 mx-auto mb-6"></div>
              <p className="text-[#666] max-w-lg mx-auto text-lg">Sorularınız veya önerileriniz için her zaman buradayız</p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <motion.div variants={fadeInRight} className="md:col-span-5">
                  <div className="bg-white rounded-2xl p-10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)]">
                    <h3 className="text-2xl font-display font-bold text-[#2d2d2d] mb-8 pb-4 border-b border-gray-100">İletişim Bilgilerimiz</h3>
                    <div className="space-y-8">
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#e9c46a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9c46a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-[#2d2d2d] mb-2">Adresimiz</h4>
                          <p className="text-[#555] leading-relaxed">Aziz Mahmud Hüdai Mah. Uncular Cad, Azat Ykş. No:3, 34000 Üsküdar/İstanbul</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#e9c46a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9c46a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-[#2d2d2d] mb-2">Telefon</h4>
                          <p className="text-[#555]">(0212) 123 45 67</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#e9c46a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9c46a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-[#2d2d2d] mb-2">E-posta</h4>
                          <p className="text-[#555]">info@cappadociacoffee.com</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-full bg-[#e9c46a]/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9c46a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-[#2d2d2d] mb-2">Çalışma Saatleri</h4>
                          <p className="text-[#555]">Her gün 09:00 - 01:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInLeft} className="md:col-span-7">
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)]">
                    <div className="absolute inset-0 bg-[#e9c46a] opacity-5 z-0"></div>
                    
                    {/* Harita başlık ve adres bilgisi */}
                    <div className="absolute top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-20 px-6 py-4 border-b border-gray-100">
                      <div className="flex items-start">
                        <div className="p-2 bg-[#e9c46a]/10 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9c46a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-[#2d2d2d]">Sandwita</h4>
                          <p className="text-[#555] text-sm">Aziz Mahmud Hüdai Mah. Uncular Cad, Azat Ykş. No:3, 34000 Üsküdar/İstanbul</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Yol tarifi butonu */}
                    <div className="absolute top-20 right-4 z-20">
                      <a 
                        href="https://maps.google.com/?q=Aziz+Mahmud+Hüdai+Mah.+Uncular+Cad,+Azat+Ykş.+No:3,+34000+Üsküdar/İstanbul"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white flex items-center px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-[#3d3d3d] font-medium text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        Yol Tarifi
                      </a>
                    </div>
                    
                    {/* Google Maps iframe */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.267932184878!2d29.01037347584465!3d41.023989917888366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9ee732c339b%3A0x1cc7eee99ee41bb8!2sAziz%20Mahmud%20H%C3%BCdai%20Mah.%20Uncular%20Cad%2C%20Azat%20Yk%C5%9F.%20No%3A3%2C%2034000%20%C3%9Csk%C3%BCdar%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1699442149507!5m2!1str!2str" 
                      width="100%" 
                      height="450" 
                      className="border-0 relative z-10" 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    
                    {/* Zoom kontrolleri */}
                    <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-2">
                      <button className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 