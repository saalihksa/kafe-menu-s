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
        {/* Arka plan gradyanı - daha hafif karartma */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-60 group-hover/card:opacity-30 group-focus-visible/card:opacity-30 transition-opacity duration-300 z-10" />
        
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
                isImageLoaded ? 'opacity-100 filter brightness-[1.15] contrast-[1.05] saturate-[1.15]' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
        </div>
        
        {/* Başlık alanı ve açıklama - Başlık daha aşağıda */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-6">
          <div className="mx-auto max-w-[90%] sm:max-w-[85%] bg-white/45 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-sm transform transition-transform duration-300 group-hover/card:translate-y-[-3px] group-focus-visible/card:translate-y-[-3px]">
            <h3 className="font-display tracking-wide text-sm sm:text-base text-center text-[#2a2a2a] line-clamp-2 font-semibold min-h-[2.5rem] flex justify-center pt-1">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-[#5a5a5a] text-center mt-1 line-clamp-1 opacity-0 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 transition-opacity duration-300">
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 