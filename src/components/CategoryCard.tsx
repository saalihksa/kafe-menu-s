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
  const { title, image, slug } = category;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <Link href={`/kategori/${slug}`} prefetch={true}>
      <motion.div
        className="relative w-full h-52 md:h-64 rounded-xl overflow-hidden group cursor-pointer bg-accent-light"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent z-10" />
        {/* Resim yüklenene kadar gri arka plan göster */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white text-xl md:text-2xl font-display">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
} 