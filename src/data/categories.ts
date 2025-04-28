export type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
};

export const categories: Category[] = [
  {
    id: 'caylar',
    title: 'Çaylar',
    slug: 'caylar',
    image: '/images/categories/caylar.jpg',
    description: 'Geleneksel ve özel çay çeşitlerimiz'
  },
  {
    id: 'geleneksel-kahveler',
    title: 'Geleneksel Kahveler',
    slug: 'geleneksel-kahveler',
    image: '/images/categories/geleneksel-kahveler.jpg',
    description: 'Türk kahvesi ve diğer geleneksel kahve çeşitlerimiz'
  },
  {
    id: 'dunya-kahveleri',
    title: 'Dünya Kahveleri',
    slug: 'dunya-kahveleri',
    image: '/images/categories/dunya-kahveleri.jpg',
    description: 'Dünyanın farklı bölgelerinden özel kahve çeşitlerimiz'
  },
  {
    id: 'meyve-sulari',
    title: 'Meyve Suları',
    slug: 'meyve-sulari',
    image: '/images/categories/meyve-sulari.jpg',
    description: 'Taze sıkılmış ve doğal meyve suları'
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    slug: 'tatlilar',
    image: '/images/categories/tatlilar.jpg',
    description: 'El yapımı taze tatlı çeşitlerimiz'
  },
  {
    id: 'tostlar',
    title: 'Tostlar',
    slug: 'tostlar',
    image: '/images/categories/tostlar.jpg',
    description: 'Özel ekmekle hazırlanan tost çeşitlerimiz'
  },
  {
    id: 'soguk-kahveler',
    title: 'Soğuk Kahveler',
    slug: 'soguk-kahveler',
    image: '/images/categories/soguk-kahveler.jpg',
    description: 'Yaz aylarının vazgeçilmezi soğuk kahvelerimiz'
  },
  {
    id: 'soguk-icecekler',
    title: 'Soğuk İçecekler',
    slug: 'soguk-icecekler',
    image: '/images/categories/soguk-icecekler.jpg',
    description: 'Serinleten içecek çeşitlerimiz'
  },
  {
    id: 'sicak-icecekler',
    title: 'Sıcak İçecekler',
    slug: 'sicak-icecekler',
    image: '/images/categories/sicak-icecekler.jpg',
    description: 'Özenle hazırlanan sıcak içeceklerimiz'
  }
];

export default categories; 