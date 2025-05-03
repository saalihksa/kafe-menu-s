'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, title, image, slug, description } = category;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <Link
      href={`/kategori/${slug}`}
      prefetch={true}
      className="block h-full group/card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c46a] rounded-2xl"
      aria-label={`${title} kategorisini görüntüle`}
    >
    <motion.div
        className="relative w-full h-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-accent-light shadow-md group-hover/card:shadow-xl group-focus-visible/card:shadow-xl"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* Arka plan gradyanı - daha koyu karartma */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover/card:opacity-50 group-focus-visible/card:opacity-50 transition-opacity duration-300 z-10" />
        
        {/* Yükleme durumu gösterimi */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {/* Görselin tıklanabilir olduğunu belirten ince ok işareti */}
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/70 backdrop-blur-sm opacity-0 group-hover/card:opacity-90 group-focus-visible/card:opacity-90 transition-opacity duration-300 flex items-center justify-center z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#2a2a2a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Resim - Parlaklığı artırılmış */}
        <div className="absolute inset-0 overflow-hidden z-[5] group-hover/card:saturate-[1.3] group-hover/card:brightness-[1.1] group-focus-visible/card:saturate-[1.3] group-focus-visible/card:brightness-[1.1] transition-all duration-500">
          <div className="absolute inset-0 bg-[#b8a88a]/10 mix-blend-overlay z-[1]"></div>
          <Image
            src={image}
            alt={`${title} kategorisi için örnek görsel`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={`object-cover object-center group-hover/card:scale-105 group-focus-visible/card:scale-105 transition-transform duration-500 ${
                isImageLoaded ? 'opacity-100 filter brightness-[1.2] contrast-[1.05] saturate-[1.15]' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
        </div>
        
        {/* Kategori Etiketi - Küçük ve transparan */}
        <div className="absolute bottom-[calc(100%-1.5rem)] right-2 z-20">
          <div className="bg-[#8a6e57]/60 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
            Kategori
          </div>
        </div>
        
        {/* Başlık alanı - Ortalanmış ve belirginleştirilmiş */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 text-center">
          <h3 
            className="category-title font-display tracking-wide font-bold text-white w-full text-xl sm:text-2xl md:text-3xl" 
            style={{ textShadow: '0px 2px 5px rgba(0, 0, 0, 0.7)' }}
          >
              {title}
            </h3>
        </div>
      </motion.div>
    </Link>
  );
} 