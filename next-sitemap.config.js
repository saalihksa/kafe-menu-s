/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.cappadociacoffee.com',
  generateRobotsTxt: false, // robots.txt'yi zaten oluşturduk
  outDir: './public',
  generateIndexSitemap: false,
  exclude: ['/404'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: 'https://www.cappadociacoffee.com',
      hreflang: 'tr',
    },
  ],
  transform: async (config, path) => {
    // Ana sayfa için yüksek öncelik ayarlama
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    // Menü ve Hakkımızda sayfaları için özel ayarlar
    if (path === '/menu' || path === '/about') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    // Kategori sayfaları için
    if (path.startsWith('/kategori/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 