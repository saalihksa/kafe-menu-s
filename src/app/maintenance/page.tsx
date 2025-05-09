import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bakım Modu | SandWita Sandwich & More',
  description: 'Sitemiz şu anda bakım modundadır. Kısa süre içinde tekrar hizmetinizdeyiz.',
};

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-4">
      <div className="text-center max-w-md mx-auto py-12 px-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">Bakım Modundayız</h1>
        
        <div className="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <p className="text-gray-700 mb-4">
          Sitemiz şu anda bakım çalışması nedeniyle geçici olarak kapalıdır.
        </p>
        
        <p className="text-gray-700 mb-6">
          En kısa sürede daha iyi bir deneyimle sizlere hizmet vermeye devam edeceğiz.
        </p>
        
        <div className="text-sm text-gray-500">
          Cappadocia Cafe & Restaurant
        </div>
      </div>
    </div>
  );
} 