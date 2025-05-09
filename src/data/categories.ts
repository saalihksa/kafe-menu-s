export type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  group: 'icecekler' | 'tatlilar' | 'bakery';
  icon?: string;
};

export const categories: Category[] = [
  {
    id: 'sandvicler',
    title: 'Sandviçler',
    slug: 'sandvicler',
    image: '/images/categories/sandvicler.jpg',
    description: 'Lezzetli ve doyurucu sandviç çeşitlerimiz.',
    group: 'bakery',
    icon: '🥪'
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    slug: 'tatlilar',
    image: '/images/categories/tatlilar.jpg',
    description: 'Birbirinden lezzetli tatlı çeşitlerimiz.',
    group: 'tatlilar',
    icon: '🍰'
  },
  {
    id: 'kahveler',
    title: 'Kahveler',
    slug: 'kahveler',
    image: '/images/categories/dunya-kahveleri.jpg',
    description: 'Özenle hazırlanmış sıcak kahve çeşitlerimiz.',
    group: 'icecekler',
    icon: '☕️'
  },
  {
    id: 'soguk-kahveler',
    title: 'Soğuk Kahveler',
    slug: 'soguk-kahveler',
    image: '/images/categories/soguk-kahveler.jpg',
    description: 'Serinletici soğuk kahve çeşitlerimiz.',
    group: 'icecekler',
    icon: '🧊'
  },
  {
    id: 'caylar',
    title: 'Çaylar',
    slug: 'caylar',
    image: '/images/categories/caylar.jpg',
    description: 'Demleme ve bitki çayı çeşitlerimiz.',
    group: 'icecekler',
    icon: '🫖'
  },
  {
    id: 'soft-icecekler',
    title: 'Soft İçecekler',
    slug: 'soft-icecekler',
    image: '/images/categories/soft-icecekler.jpg',
    description: 'Gazlı ve gazsız soğuk içecek çeşitlerimiz.',
    group: 'icecekler',
    icon: '🥤'
  }
];

export default categories; 