'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter, FaTripadvisor, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const socialLinks = [
    { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/sandwitaistanbul/' },
    // { name: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/cappadociacoffee/' },
    // { name: 'Twitter', icon: FaTwitter, url: '#' },
    // { name: 'TripAdvisor', icon: FaTripadvisor, url: '#' },
  ];
  
  return (
    <footer className="relative bg-[var(--accent)] text-[var(--foreground)] pt-16 pb-8 border-t border-[var(--border)]">
      {/* Dekoratif üst kısım - İnce gri çizgi */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo ve Bilgi - Cappadocia Coffee yazısı kaldırıldı */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Cappadocia Coffee yazısı kaldırıldı */}
            {/* <div className="mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              <span className="font-display text-2xl text-primary">Cappadocia Coffee</span>
            </div> */}
            <p className="text-sm text-[var(--text-muted)] text-center md:text-left mb-8 bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              Doğal malzemeler ve lezzetli seçenekler ile her gün saat 09:00 - 01:00 arasında kaliteli hizmet anlayışımızla hizmetinizdeyiz.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {socialLinks.map((link, index) => {
                 const IconComponent = link.icon;
                 // Determine background gradient based on social network
                 let bgGradient = 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]'; // Default güncellendi
                 if (link.name === 'Instagram') {
                   bgGradient = 'bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 hover:brightness-110';
                 } else if (link.name === 'Facebook') {
                   bgGradient = 'bg-gradient-to-br from-blue-600 to-blue-800 hover:brightness-110';
                 }

                 return (
                <motion.a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                     // Apply dynamic background gradient
                     className={`h-10 w-10 rounded-full ${bgGradient} transition-all duration-300 flex items-center justify-center text-white shadow-md hover:shadow-lg hover:-translate-y-1`}
                  aria-label={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                     <IconComponent className="h-5 w-5" />
                </motion.a>
                 );
              })}
            </div>
          </motion.div>
          
          {/* İletişim */}
          <motion.div 
            className="md:col-span-4 md:border-l md:border-[var(--border)] md:pl-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-primary text-center md:text-left border-b border-[var(--border)] pb-2">
              İletişim Bilgileri
            </h3>
            <address className="text-sm text-[var(--text-muted)] not-italic space-y-5">
              <motion.div 
                className="flex items-start bg-[var(--accent)] p-5 rounded-lg shadow-sm border border-[var(--border)] hover:shadow-md transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="h-10 w-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>
                <div>
                  <p className="font-medium text-primary">Adresimiz</p>
                  <p className="mt-1">Aziz Mahmut Hüdayi, Uncular Cd. No:7/A,</p>
                  <p>34672 Üsküdar/İstanbul</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start bg-[var(--accent)] p-5 rounded-lg shadow-sm border border-[var(--border)] hover:shadow-md transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="h-10 w-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                </div>
                <div>
                  <p className="font-medium text-primary">Bizi Arayın</p>
                  <p className="mt-1">(0212) 123 45 67</p>
              </div>
              </motion.div>
              
              
            </address>
          </motion.div>
          
          {/* Çalışma Saatleri */}
          <motion.div 
            className="md:col-span-4 md:border-l md:border-[var(--border)] md:pl-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-primary text-center md:text-left border-b border-[var(--border)] pb-2">
              Çalışma Saatleri
            </h3>
            <div className="bg-[var(--accent)] rounded-xl shadow-sm p-5 border border-[var(--border)]">
              <ul className="text-sm space-y-4 text-[var(--text-muted)]">
                <li className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span className="font-medium text-primary mb-2 sm:mb-0">Pazartesi - Cuma</span>
                  <span className="bg-[var(--accent)] px-4 py-2 rounded-full text-[var(--foreground)] font-medium shadow-sm">09:00 - 01:00</span>
              </li>
                <li className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span className="font-medium text-primary mb-2 sm:mb-0">Cumartesi - Pazar</span>
                  <span className="bg-[var(--accent)] px-4 py-2 rounded-full text-[var(--foreground)] font-medium shadow-sm">09:00 - 01:00</span>
              </li>
            </ul>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-[var(--border)] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-[var(--text-muted)]">
            © {currentYear} Piston Creative. Tüm hakları saklıdır.
          </p>
          
          {/* Piston Creative Yazısı yerine Piston Logo */}
          <div className="mt-4">
            <a href="https://www.pistoncreative.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image
                src="/images/piston-logo.png"
                alt="Piston Creative Logo"
                width={120} // Logonuzun boyutuna göre ayarlayın
                height={30} // Logonuzun boyutuna göre ayarlayın
                className="object-contain"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 