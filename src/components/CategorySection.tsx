'use client';

import { motion } from 'framer-motion';
import { MenuCategory } from '@/data/menu';
import MenuCard from './MenuCard';
import Image from 'next/image';

interface CategorySectionProps {
  category: MenuCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Her bölümün arkaplan rengini değişimli olarak ayarlama
  const isEvenSection = category.id === 'sicak-icecekler' || 
                        category.id === 'tatlilar' || 
                        category.id === 'ana-yemekler';
  
  const sectionBgClass = isEvenSection ? 'bg-[var(--section-bg)]' : 'bg-[var(--section-alt)]';

  return (
    <section id={category.id} className={`py-12 scroll-mt-20 ${sectionBgClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8"
        >
          {category.image && (
            <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--primary)] mb-2">
            {category.name}
          </h2>
          <p className="text-lg text-[var(--text-muted)]">{category.description}</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {category.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 