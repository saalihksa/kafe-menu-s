export type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  group: 'kahveler' | 'icecekler' | 'tatlilar' | 'bakery';
};

export const categories: Category[] = [
  {
    id: 'aromali-sicak-kahveler',
    title: 'Aromalı Sıcak Kahveler',
    slug: 'aromali-sicak-kahveler',
    image: '/images/categories/sicak-icecekler.jpg',
    description: 'Çeşitli lezzetlerle hazırlanan özel sıcak kahvelerimiz',
    group: 'kahveler'
  },
  {
    id: 'espresso-bazli-kahveler',
    title: 'Espresso Bazlı Kahveler',
    slug: 'espresso-bazli-kahveler',
    image: '/images/categories/dunya-kahveleri.jpg',
    description: 'Kaliteli espresso bazlı kahve çeşitlerimiz',
    group: 'kahveler'
  },
  {
    id: 'demleme-kahveler',
    title: 'Demleme Kahveler',
    slug: 'demleme-kahveler',
    image: '/images/categories/geleneksel-kahveler.jpg',
    description: 'Özel demleme yöntemleriyle hazırlanan kahvelerimiz',
    group: 'kahveler'
  },
  {
    id: 'soguk-kahveler',
    title: 'Soğuk Kahveler',
    slug: 'soguk-kahveler',
    image: '/images/categories/soguk-kahveler.jpg',
    description: 'Serinleten lezzetli soğuk kahve çeşitlerimiz',
    group: 'kahveler'
  },
  {
    id: 'aromali-soguk-kahveler',
    title: 'Aromalı Soğuk Kahveler',
    slug: 'aromali-soguk-kahveler',
    image: '/images/categories/soguk-icecekler.jpg',
    description: 'Özel aromalarla zenginleştirilmiş soğuk kahvelerimiz',
    group: 'kahveler'
  },
  {
    id: 'sicak-icecekler',
    title: 'Sıcak İçecekler',
    slug: 'sicak-icecekler',
    image: '/images/categories/caylar.jpg',
    description: 'Sıcak çikolata gibi özel içeceklerimiz',
    group: 'icecekler'
  },
  {
    id: 'diger-icecekler',
    title: 'Kahve Konseptleri',
    slug: 'diger-icecekler',
    image: '/images/categories/meyve-sulari.jpg',
    description: 'Farklı kahve deneyimleri sunan özel konseptlerimiz',
    group: 'kahveler'
  },
  {
    id: 'patisserie',
    title: 'Patisserie Menüsü',
    slug: 'patisserie',
    image: '/images/categories/tatlilar.jpg',
    description: 'Özel tariflerle hazırlanan tatlı ve pasta çeşitlerimiz',
    group: 'tatlilar'
  },
  {
    id: 'bakery',
    title: 'Bakery Menüsü',
    slug: 'bakery',
    image: '/images/categories/tostlar.jpg',
    description: 'Taze pişirilen ekmek, kek ve kurabiye çeşitlerimiz',
    group: 'bakery'
  }
];

export default categories; 