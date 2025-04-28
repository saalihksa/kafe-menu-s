'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const socialLinks = [
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/cappadociacoffeebakery/?hl=en' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/cappadociacoffee/' },
  ];
  
  return (
    <footer className="bg-gradient-to-b from-[#e7e1d4] to-[#d6cab1] text-[var(--foreground)] pt-16 pb-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo ve Bilgi */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <span className="font-display text-2xl text-primary">Logo Alanı</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] text-center md:text-left mb-6">
              Doğal malzemeler ve lezzetli seçenekler ile her gün saat 09:00 - 01:00 arasında kaliteli hizmet anlayışımızla hizmetinizdeyiz.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-[var(--accent)] hover:bg-primary transition-colors duration-300 flex items-center justify-center text-white"
                  aria-label={link.name}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* İletişim */}
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-primary text-center md:text-left">
              İletişim
            </h3>
            <address className="text-sm text-[var(--text-muted)] not-italic space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p>Aziz Mahmut Hüdayi, Uncular Cd. No:7/A,</p>
                  <p>34672 Üsküdar/İstanbul</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>(0212) 123 45 67</p>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>info@cappadociacoffee.com</p>
              </div>
            </address>
          </motion.div>
          
          {/* Çalışma Saatleri */}
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-primary text-center md:text-left">
              Çalışma Saatleri
            </h3>
            <ul className="text-sm space-y-3 text-[var(--text-muted)]">
              <li className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <span className="font-medium">Pazartesi - Cuma</span>
                <span className="bg-[var(--accent-light)] px-3 py-1 rounded-full text-accent-dark font-medium">09:00 - 01:00</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <span className="font-medium">Cumartesi - Pazar</span>
                <span className="bg-[var(--accent-light)] px-3 py-1 rounded-full text-accent-dark font-medium">09:00 - 01:00</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} Cappadocia Coffee & Bakery. Tüm hakları saklıdır.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-primary transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-primary transition-colors">
              Kullanım Koşulları
            </Link>
            <Link href="/cookies" className="text-xs text-[var(--text-muted)] hover:text-primary transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 