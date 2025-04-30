'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menü için animasyon varyantları (sağdan açılma)
  const sidebarVariants = {
    closed: { x: "100%", opacity: 0 }, // Sağa gitmesi için x: "100%"
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      {/* Ana Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#d6cab1]/95 backdrop-blur-md shadow-sm' 
          : isHomePage 
            ? 'bg-transparent' 
            : 'bg-[#d6cab1]/75 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Alanı */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className={`transition-all duration-300 py-2 px-4 rounded-lg ${isHomePage && !scrolled ? 'opacity-70 hover:opacity-100 bg-white/20 backdrop-blur-sm' : 'opacity-85 hover:opacity-100 bg-white/30 backdrop-blur-sm'}`}>
                  <span className="font-display text-xl text-primary">Logo Alanı</span>
                </div>
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
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              >
                <span className="sr-only">{isOpen ? "Menüyü Kapat" : "Menüyü Aç"}</span>
                {isOpen ? (
                  <HiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <HiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobil Menü Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* Mobil Menü (Sağdan Açılır ve En Saydam) */}
      <motion.div
        id="mobile-menu"
        className="fixed top-0 right-0 h-screen w-64 bg-[#e7e1d4]/45 backdrop-blur-lg shadow-lg z-50 md:hidden overflow-y-auto" // Opaklık /60 -> /45 yapıldı
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-5 relative h-full">
          {/* Menü Kapatma Butonu (Sol üst) */}
          <button 
             onClick={() => setIsOpen(false)}
             className="absolute top-4 left-4 p-1 rounded-md text-primary hover:text-accent focus:outline-none"
             aria-label="Menüyü Kapat"
           >
             <HiX className="h-6 w-6" />
           </button>
          
          <div className="mt-12 space-y-2">
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
          </div>
        </div>
      </motion.div>
    </>
  );
} 