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
  const { id, title, image, slug } = category;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <Link href={`/kategori/${slug}`} prefetch={true} className="block h-full">
      <motion.div
        className="relative w-full h-full aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer bg-accent-light shadow-md hover:shadow-xl"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Çok daha az vinyetleme için sadece alt kısımda hafif bir gölge bırakalım */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300 z-10" />
        
        {/* Resim yüklenene kadar gri arka plan göster */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        
        {/* Daha canlı görünüm için gelişmiş filtreler */}
        <div className="absolute inset-0 overflow-hidden z-[5] group-hover:saturate-[1.8] group-hover:brightness-[1.15] group-hover:contrast-[1.1] transition-all duration-500">
          <div className="absolute inset-0 bg-[#b8a88a]/10 mix-blend-overlay z-[1]"></div>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
                isImageLoaded ? 'opacity-100 filter saturate-[1.35] contrast-[1.08] brightness-[1.05]' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
        </div>
        
        {/* Yazıyı ortaya konumlandırma - daha belirgin hale getir */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-5 py-3 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 shadow-lg transform group-hover:scale-105 transition-all duration-300">
            <h3 className="text-white text-xl md:text-2xl font-display drop-shadow-lg">{title}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 