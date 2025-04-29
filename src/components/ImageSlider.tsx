'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface VideoSliderProps {
  videoSrc: string;
  posterSrc: string;
  isEnabled?: boolean;
}

export default function VideoSlider({ videoSrc, posterSrc, isEnabled = true }: VideoSliderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (!videoRef.current) return;

      // IOS ve diğer mobil tarayıcılar için tüm özellikleri ekleyelim
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.setAttribute('muted', '');
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', '');
      videoRef.current.setAttribute('preload', 'auto');
      
      try {
        // Video otomatik oynatmayı deneyelim
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Video otomatik başlatıldı');
        }
      } catch (err) {
        console.error('Video otomatik oynatılamadı:', err);
        
        // Sayfa yüklendikten kısa bir süre sonra tekrar deneyelim
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => {
              console.error('Gecikme sonrası oynatma başarısız:', e);
              
              // Etkileşim beklememek için tüm olası olayları dinleyelim
              const startVideoOnInteraction = () => {
                if (videoRef.current) {
                  const playAttempt = videoRef.current.play();
                  if (playAttempt) {
                    playAttempt.catch(() => {
                      // Başaramazsak, sessizce devam et
                    });
                  }
                }
              };
              
              // Tüm yaygın etkileşimleri dinle
              window.addEventListener('touchstart', startVideoOnInteraction, {once: true});
              window.addEventListener('click', startVideoOnInteraction, {once: true});
              window.addEventListener('scroll', startVideoOnInteraction, {once: true});
              window.addEventListener('keydown', startVideoOnInteraction, {once: true});
            });
          }
        }, 1000);
      }
    };

    // Sayfa yüklenir yüklenmez videoyu başlatmayı deneyelim
    attemptAutoplay();

    // İkinci bir deneme (önbellekten yükleme için)
    window.addEventListener('load', () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Sessizce hatayı engelle
        });
      }
    });

    return () => {
      // Temizleme işlemleri
      window.removeEventListener('load', () => {});
      window.removeEventListener('touchstart', () => {});
      window.removeEventListener('click', () => {});
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('keydown', () => {});
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="w-full h-full relative">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster={posterSrc}
          className="object-cover w-full h-full absolute inset-0"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      </div>
    </div>
  );
} 