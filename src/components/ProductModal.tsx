'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MenuItem } from '@/data/menu';

interface ProductModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ item, isOpen, onClose }: ProductModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
    
    // Arkaplan kaydırmayı engelle
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Temizlik işlevi
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isModalOpen) return null;

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'vegetarian':
        return 'badge-vegetarian';
      case 'vegan':
        return 'badge-vegan';
      case 'glutenFree':
        return 'badge-glutenfree';
      default:
        return 'badge-popular';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#e7e1d4] rounded-lg shadow-xl max-w-lg w-full overflow-hidden z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 w-full">
            <Image 
              src={item.image || '/images/placeholder.jpg'} 
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-accent-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-primary">{item.name}</h2>
              <span className="menu-price text-xl font-semibold">{item.price.toFixed(2)} ₺</span>
            </div>
            
            <div className="mb-4">
              {item.vegetarian && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${getBadgeClass('vegetarian')}`}>
                  Vejeteryan
                </span>
              )}
              {item.vegan && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${getBadgeClass('vegan')}`}>
                  Vegan
                </span>
              )}
              {item.glutenFree && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${getBadgeClass('glutenFree')}`}>
                  Glutensiz
                </span>
              )}
              {item.popular && (
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 badge-popular">
                  Popüler
                </span>
              )}
            </div>
            
            <p className="text-[var(--text-muted)] mb-6">{item.description}</p>
            
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2 text-primary">İçindekiler</h3>
                <ul className="list-disc pl-5 text-[var(--text-muted)]">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Alerjenler</h3>
                <div className="text-[var(--text-muted)]">
                  {item.allergens.join(', ')}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
} 