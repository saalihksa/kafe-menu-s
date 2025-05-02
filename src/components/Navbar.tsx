'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

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
    closed: { x: "100%", opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 30,
      }
    },
  };
  
  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
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
            <div className="flex items-center relative z-10">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className={`transition-all duration-300 rounded-lg ${isHomePage && !scrolled ? 'bg-transparent' : 'bg-transparent'}`}>
                  <Image 
                    src="/images/cappadocia-logo.png" 
                    alt="Cappadocia Coffee & Bakery" 
                    width={300}
                    height={75}
                    className="object-contain w-auto"
                    priority
                    style={{ height: 'auto' }}
                  />
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

      {/* Mobil Menü (Sağdan Açılır ve Geliştirilmiş Stil) */}
      <motion.div
        id="mobile-menu"
        className="fixed top-0 right-0 h-dvh w-72 bg-gradient-to-b from-[#e7e1d4]/80 to-[#d6cab1]/85 backdrop-blur-lg shadow-2xl z-50 md:hidden flex flex-col"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center p-5 border-b border-[var(--border)]/50">
          <Link href="/" onClick={() => setIsOpen(false)} className="block">
            <Image
              src="/images/cappadoca-full-logo.png"
              alt="Cappadocia Coffee & Bakery Logo"
              width={150}
              height={45}
              className="object-contain"
            />
          </Link>
          <button 
             onClick={() => setIsOpen(false)}
             className="p-1 rounded-md text-primary/70 hover:text-accent hover:bg-black/5 focus:outline-none"
             aria-label="Menüyü Kapat"
           >
             <HiX className="h-6 w-6" />
           </button>
        </div>
        
        <motion.div 
          className="flex-grow p-5 space-y-2"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        >
          <motion.div variants={linkVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.1 }}>
            <Link 
              href="/"
              className="block px-4 py-3 rounded-lg text-lg font-medium text-primary hover:text-accent hover:bg-[var(--accent-light)]/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Ana Sayfa
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.1 }}>
            <Link 
              href="/menu" 
              className="block px-4 py-3 rounded-lg text-lg font-medium text-primary hover:text-accent hover:bg-[var(--accent-light)]/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Menü
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.1 }}>
            <Link 
              href="/about" 
              className="block px-4 py-3 rounded-lg text-lg font-medium text-primary hover:text-accent hover:bg-[var(--accent-light)]/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Hakkımızda
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
} 