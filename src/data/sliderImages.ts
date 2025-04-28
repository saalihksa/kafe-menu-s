export type SliderImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

const sliderImages: SliderImage[] = [
  {
    src: '/images/slider1.jpg',
    alt: 'Taze kahve çekirdekleri',
    title: 'Özenle Seçilmiş Kahve Çekirdekleri',
    description: 'Dünyanın dört bir yanından gelen özel kahve çekirdeklerimiz her gün taze kavrulur.'
  },
  {
    src: '/images/slider2.jpg',
    alt: 'Kahvaltı sofrasından görünüm',
    title: 'Enfes Kahvaltı Menümüz',
    description: 'Doğal ve taze malzemelerle hazırlanan kahvaltımızı herkesin tatmasını istiyoruz.'
  },
  {
    src: '/images/slider3.jpg',
    alt: 'Lezzetli tatlılar',
    title: 'El Yapımı Tatlılar',
    description: 'Şeflerimizin özenle hazırladığı tatlılar kahvenizle mükemmel uyum sağlar.'
  },
  {
    src: '/images/slider4.jpg',
    alt: 'Rahat kafe ortamı',
    title: 'Keyifli Bir Ortam',
    description: 'Arkadaşlarınızla buluşmak veya çalışmak için ideal, sıcak bir mekan.'
  }
];

export default sliderImages; 