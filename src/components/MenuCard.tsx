'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FaHeart } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

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
  ingredients?: string[];
}

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer border border-[rgba(0,0,0,0.03)]"
        whileHover={{ 
          y: -4,
          boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.1), 0 6px 8px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.25 },
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={openModal}
        style={{ width: '100%', height: '100%' }}
      >
        <div className="aspect-square w-full relative overflow-hidden">
          {item.image ? (
            <>
              <div
                className={`absolute inset-0 bg-gray-100 ${
                  isImageLoaded ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-300`}
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </motion.div>
              
              {item.isPopular && (
                <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-[#FF5C5C] to-[#FF3C3C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center">
                    <FaHeart className="h-2.5 w-2.5 mr-1" />
                    Popüler
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#d6cab1] to-[#e7e1d4] flex items-center justify-center">
              <span className="text-[#8a6e57] opacity-70 text-sm font-medium">Görsel Yok</span>
            </div>
          )}
          
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <div className="bg-[#8a6e57] text-white text-base font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {item.price} ₺
            </div>
          </div>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between min-h-[100px]">
          <div className="flex flex-col">
            <h3 className="font-bold text-[#3d3d3d] font-display text-lg leading-tight mb-1.5 line-clamp-2">
              {item.name}
            </h3>
            
            {item.description && (
              <p className="text-xs text-[#696969] line-clamp-2 mb-2">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-auto">
            {item.isVegetarian && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-800">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                Vejetaryen
              </span>
            )}
            {item.isVegan && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1"></span>
                Vegan
              </span>
            )}
            {item.isGlutenFree && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1"></span>
                Glutensiz
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog
        as={motion.div}
        open={isModalOpen}
        onClose={closeModal}
        className="relative z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" onClick={closeModal} />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            as={motion.div}
            className="mx-auto max-w-lg w-full rounded-3xl bg-white shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#d6cab1] to-[#e7e1d4] flex items-center justify-center">
                  <span className="text-[#8a6e57] opacity-70 font-medium">Görsel Yok</span>
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white transition-colors z-10"
              >
                <FaTimes className="h-5 w-5 text-gray-800" />
              </button>
              {item.isPopular && (
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#FF5C5C] to-[#FF3C3C] text-white px-4 py-2 rounded-full shadow-lg flex items-center">
                    <FaHeart className="h-4 w-4 mr-2" />
                    <span className="font-medium text-sm">Popüler</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-7">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-3xl font-display font-bold text-[#3d3d3d]">
                  {item.name}
                </Dialog.Title>
                <div className="text-xl font-bold text-white bg-[#8a6e57] px-4 py-2 rounded-full shadow-md">
                  {item.price} ₺
                </div>
              </div>

              <Dialog.Description className="mt-3 text-[#696969] text-base">
                {item.description}
              </Dialog.Description>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.isVegetarian && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Vejetaryen
                  </span>
                )}
                {item.isVegan && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-teal-100 text-teal-800">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    Vegan
                  </span>
                )}
                {item.isGlutenFree && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-amber-100 text-amber-800">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Glutensiz
                  </span>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mt-5">
                    <h4 className="font-semibold text-[#3d3d3d] mb-2">İçindekiler:</h4>
                    <p className="text-[#696969] text-sm">
                      {item.ingredients.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MenuCard; 