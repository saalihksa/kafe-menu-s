'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function Home() {
  // Kafe için JSON-LD verisi
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "SandWita Sandwich & More",
    "image": "https://www.sandwita.com/images/og-image.jpg",
    "url": "https://www.sandwita.com",
    "telephone": "(0212) 123 45 67",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Aziz Mahmut Hüdayi, Uncular Cd. No:7/A",
      "addressLocality": "Üsküdar",
      "addressRegion": "İstanbul",
      "postalCode": "34672",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.023989917888366,
      "longitude": 29.01037347584465
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "01:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "01:00"
      }
    ],
    "servesCuisine": ["Cafe", "Bakery", "Coffee"],
    "priceRange": "$$",
    "menu": "https://www.sandwita.com/menu",
    "acceptsReservations": "True"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Script
        id="restaurant-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
