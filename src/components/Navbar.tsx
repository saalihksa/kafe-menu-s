'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#d6cab1]/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-display text-xl text-primary">Logo Alanı</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-primary hover:text-accent transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/menu" className="font-medium text-primary hover:text-accent transition-colors">
              Menü
            </Link>
            <Link href="/about" className="font-medium text-primary hover:text-accent transition-colors">
              Hakkımızda
            </Link>
            <Link href="/contact" className="font-medium text-primary hover:text-accent transition-colors">
              İletişim
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü Aç</span>
              {isOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden bg-[#e7e1d4]/95 backdrop-blur-sm`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-accent hover:bg-accent-light transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/menu" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-accent hover:bg-accent-light transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Menü
          </Link>
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-accent hover:bg-accent-light transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Hakkımızda
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-accent hover:bg-accent-light transition-colors"
            onClick={() => setIsOpen(false)}
          >
            İletişim
          </Link>
        </div>
      </motion.div>
    </nav>
  );
} 