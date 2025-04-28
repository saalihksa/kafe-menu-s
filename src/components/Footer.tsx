'use client';

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--text-secondary)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Bilgi */}
          <div>
            <Link href="/" className="font-display text-2xl font-bold text-[var(--primary)]">
              Cappadocia
            </Link>
            <p className="mt-4 text-sm">
              Doğal malzemeler ve özel kahvelerle hazırlanan eşsiz lezzetler
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--primary)] mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[var(--accent)] transition-colors">Menü</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">Hakkımızda</a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--accent)] transition-colors">İletişim</a>
              </li>
            </ul>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--primary)] mb-4">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span>08:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi:</span>
                <span>09:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span>10:00 - 22:00</span>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--primary)] mb-4">
              İletişim
            </h3>
            <address className="not-italic space-y-2">
              <p>Göreme, Nevşehir</p>
              <p>Telefon: +90 (555) 123 45 67</p>
              <p>Email: info@cappadociacoffee.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Cappadocia Coffee & Bakery. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 