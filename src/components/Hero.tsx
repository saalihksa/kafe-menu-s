'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VideoSlider from './ImageSlider';

export default function Hero() {
  const router = useRouter();
  const isVideoTriggered = useRef(false);
  
  // Sayfa yüklenir yüklenmez video başlatmayı garantiyelim
  useEffect(() => {
    // Component mount edildiğinde otomatik video oynatma için hazırlık
    isVideoTriggered.current = true;

    // Kategorileri önceden yükleme (video oynatmaya odaklanabilmek için)
    import('@/data/categories').catch(() => {});

    // Video elementinin doğrudan oynatılmasını deneyelim
    const videoElements = document.querySelectorAll('video');
    if (videoElements.length > 0) {
      for (const video of videoElements) {
        video.play().catch(() => {});
      }
    }
  }, []);
  
  // Navigasyon işlevini optimize edelim
  const handleNavigateToMenu = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Yönlendirme öncesi kategorileri yüklemek için
    // Veri önbelleğini ısıtmak için
    import('@/data/categories').then(() => {
      router.push('/menu');
    });
  }, [router]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video slider - otomatik başlayacak şekilde ayarlandı */}
      <VideoSlider 
        videoSrc="/videos/cafe-video.mp4" 
        posterSrc="/images/hero-bg.jpg" 
        isEnabled={true}
      />
      
      {/* Arka plan karartması */}
      <div className="absolute inset-0 bg-black opacity-50 z-[5]"></div>
      
      {/* Hero içeriği */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <a 
                href="/menu"
                onClick={handleNavigateToMenu}
                className="rounded-full bg-[var(--primary)] text-white font-medium px-10 py-4 text-lg shadow-lg hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 inline-flex items-center space-x-3"
              >
                <span>Menüyü İncele</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 