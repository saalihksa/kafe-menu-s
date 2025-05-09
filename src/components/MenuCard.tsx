'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  FaHeart,
  FaExpandAlt,
  FaTimes,
  FaLeaf,
  FaSeedling,
  FaBan,
} from 'react-icons/fa';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isNespresso?: boolean;
  ingredients?: string[];
}

interface MenuCardProps {
  item: MenuItem;
}

// Etiketler için ikon ve renk eşleşmeleri
const tagStyles = {
  vegetarian: {
    icon: FaLeaf,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    text: 'Vejetaryen',
  },
  vegan: {
    icon: FaSeedling,
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-800',
    borderColor: 'border-teal-200',
    text: 'Vegan',
  },
  glutenFree: {
    icon: FaBan,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    text: 'Glutensiz',
  },
};

// Performans için hazır animasyon nesneleri
const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 } // Süreyi düşürdük
};

const modalAnimation = {
  initial: { opacity: 0, y: 10 }, // Daha hafif bir animasyon
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 } // Spring yerine basit animasyon
};

// Define the component function separately
const MenuCardComponent: React.FC<MenuCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // useCallback ile fonksiyon referansını sabitliyoruz
  const openModal = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsModalOpen(true);
  }, []);
  
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

  return (
    <>
      {/* Ürün Kartı */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col cursor-pointer border border-gray-200/50 group/card"
        whileHover={{
          y: -4,
          transition: { duration: 0.25 },
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={openModal}
        style={{ width: '100%', height: '100%' }}
        aria-label={`${item.name} detaylarını görüntüle`}
      >
        {/* Görsel Alanı */}
        <div className="aspect-square w-full relative overflow-hidden bg-gray-200 border-b border-gray-300">
          {/* Ürün görselini göster */}
          {item.image ? (
            <Image 
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" // Farklı ekran boyutları için optimize et
              className={`object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              priority={false} // İlk yüklenen görseller dışındakiler için false olabilir
            />
          ) : (
            // Görsel yoksa placeholder
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-xs font-medium">Görsel Yok</span>
            </div>
          )}
          {/* Görsel yüklenene kadar gösterilecek iskelet */}
          {!isImageLoaded && item.image && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          
          {/* Nespresso İkonu (Koşullu) */}
          {item.isNespresso && (
            <div className="absolute bottom-2 right-2 z-10">
              <Image 
                src="/images/nespresso-icon.png" 
                alt="Nespresso Ürünü"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
        </div>

        {/* İçerik Alanı */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
          <div className="flex flex-col mb-3">
            {/* Başlık ve Fiyat */}
            <div className="flex justify-between items-start mb-1.5 gap-2 sm:gap-3">
              <h3 className="font-semibold text-gray-800 font-sans text-[15px] sm:text-[17px] leading-tight line-clamp-2 flex-1 group-hover/card:text-[#6b563f] transition-colors duration-200">
                {item.name}
              </h3>
              <span className="text-lg sm:text-xl font-bold text-[#6b563f] whitespace-nowrap font-sans pt-0.5">
                {item.price}<span className="text-sm font-semibold"> ₺</span>
              </span>
            </div>
            {/* Açıklama */}
            {item.description && (
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                {item.description}
              </p>
            )}
          </div>
          {/* Etiketler */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2 border-t border-gray-100 min-h-[26px]">
            {(() => {
              const dietaryTags = (['vegetarian', 'vegan', 'glutenFree'] as const).filter(tagType => {
              const key = `is${tagType.charAt(0).toUpperCase() + tagType.slice(1)}` as keyof MenuItem;
                return !!item[key];
              });

              if (dietaryTags.length > 0) {
                return dietaryTags.map(tagType => {
                  const style = tagStyles[tagType as keyof typeof tagStyles];
                const Icon = style.icon;
                return (
                  <span 
                    key={tagType}
                    title={style.text}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium ${style.bgColor} ${style.textColor} border ${style.borderColor}`}
                  >
                    <Icon className="w-2.5 h-2.5 mr-1" />
                    {style.text}
                  </span>
                );
                });
              } else {
                // Hiç diyet etiketi yoksa, üç nokta motifi göster
                // Ana div'e justify-center ekleyelim (yukarıdaki className'e eklenecek)
                return (
                  <div className="w-full flex justify-center items-center">
                    <span className="text-gray-400 text-xs tracking-widest">
                      ● ● ●
                    </span>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </motion.div>

      {/* Modal Dialog - Sadece açıkken render edilsin */}
      {isModalOpen && (
        <Dialog
          as="div"
          open={isModalOpen}
          onClose={closeModal}
          className="relative z-[100]"
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60"
            aria-hidden="true"
            onClick={closeModal}
            {...overlayAnimation}
          />
          {/* Modal İçerik Wrapper */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="mx-auto max-w-xl w-full"
              {...modalAnimation}
            >
              <Dialog.Panel className="rounded-2xl bg-gradient-to-b from-white via-gray-50 to-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Modal Başlığı ve Kapatma Butonu */} 
                <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white/90 z-10">
                  <Dialog.Title className="text-xl font-display font-semibold text-gray-800">
                    Ürün Detayı
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-2 hover:bg-gray-200 transition-colors group"
                    aria-label="Kapat"
                  >
                    <FaTimes className="h-4 w-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                  </button>
                </div>

                {/* Modal İçerik Alanı (Kaydırılabilir) */}
                <div className="flex-1 overflow-y-auto">
                  {/* Görsel Alanı */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        quality={70}
                        priority={true} // Modalda görsel yüklenmeyi önceliklendir
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#e0d8c4]/80 to-[#f0eadf]/80 flex items-center justify-center border-b border-gray-200/50">
                        <span className="text-[#8a6e57]/80 font-medium">Görsel Mevcut Değil</span>
                      </div>
                    )}
                    {item.isPopular && (
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center">
                          <FaHeart className="h-3 w-3 mr-1.5" />
                          <span className="font-semibold text-xs tracking-wide">Popüler Ürün</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Detaylar Alanı */}
                  <div className="p-6 space-y-5">
                    {/* Başlık ve Fiyat */}
                    <div className="flex justify-between items-start gap-4">
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 flex-1">
                        {item.name}
                      </h2>
                      <span className="text-2xl font-bold text-[#7c6a55] font-sans ml-4 whitespace-nowrap pt-1">
                        {item.price} <span className="text-sm font-medium">₺</span>
                      </span>
                    </div>
                    {/* Açıklama */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    {/* Etiketler */}
                    <div className="flex flex-wrap gap-2.5 pt-3 border-t border-gray-200/80">
                      {(['vegetarian', 'vegan', 'glutenFree'] as const).map((tagType) => {
                        const key = `is${tagType.charAt(0).toUpperCase() + tagType.slice(1)}` as keyof MenuItem;
                        if (item[key]) {
                          const style = tagStyles[tagType];
                          const Icon = style.icon;
                          return (
                            <span 
                              key={tagType}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${style.bgColor} ${style.textColor} border ${style.borderColor}`}
                            >
                              <Icon className="w-3 h-3 mr-1.5" />
                              {style.text}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    {/* İçindekiler */} 
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="pt-4 border-t border-gray-200/80">
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm">İçindekiler:</h4>
                        <p className="text-gray-600 text-xs leading-snug">
                          {item.ingredients.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </>
  );
};

// React.memo sarmasını export ederken yapıyoruz
export default React.memo(MenuCardComponent); 