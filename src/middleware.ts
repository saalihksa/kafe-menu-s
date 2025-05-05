import { NextRequest, NextResponse } from 'next/server';

// ======== BAKIM MODU KONTROLÜ ========
// Bakım modunu açmak için: MAINTENANCE_MODE = true
// Bakım modunu kapatmak için: MAINTENANCE_MODE = false
const MAINTENANCE_MODE = true;

// Bakım modu aktif olsa bile erişime izin verilecek adresler
// (örn: admin paneli, api istekleri, vb.)
const EXCLUDED_PATHS: string[] = [
  // '/admin',  // Admin paneli için ayarlanabilir
  // '/api',    // API istekleri için ayarlanabilir
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Eğer bakım modu aktifse ve zaten bakım sayfasında değilse
  if (MAINTENANCE_MODE && pathname !== '/maintenance') {
    // İstisna yolları kontrol et
    const isExcludedPath = EXCLUDED_PATHS.some(path => pathname.startsWith(path));
    
    if (!isExcludedPath) {
      // Statik dosyalara erişime izin ver (resimler, CSS, JS vb.)
      if (
        pathname.includes('_next') || 
        pathname.includes('/images/') ||
        pathname.endsWith('.jpg') || 
        pathname.endsWith('.png') || 
        pathname.endsWith('.svg') || 
        pathname.endsWith('.ico')
      ) {
        return NextResponse.next();
      }
      
      // Bakım sayfasına yönlendir
      const maintenanceUrl = new URL('/maintenance', request.url);
      return NextResponse.rewrite(maintenanceUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 