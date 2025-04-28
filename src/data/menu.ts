export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'sicak-icecekler' | 'soguk-icecekler' | 'tatlilar' | 'kahvalti' | 'ana-yemekler' | 'caylar' | 'geleneksel-kahveler' | 'dunya-kahveleri' | 'meyve-sulari' | 'tostlar' | 'soguk-kahveler';
  popular?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  ingredients?: string[];
  allergens?: string[];
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    id: 'sicak-icecekler',
    name: 'Sıcak İçecekler',
    description: 'Özenle hazırlanan sıcak içeceklerimiz',
    items: [
      {
        id: 'turk-kahvesi',
        name: 'Türk Kahvesi',
        description: 'Geleneksel yöntemle köpüklü hazırlanan Türk kahvesi',
        price: 35,
        image: '/images/products/turk-kahvesi.jpg',
        category: 'sicak-icecekler',
        popular: true,
      },
      {
        id: 'latte',
        name: 'Latte',
        description: 'İtalyan usulü hazırlanan süt köpüklü espresso',
        price: 45,
        image: '/images/products/latte.jpg',
        category: 'sicak-icecekler',
      },
      {
        id: 'filtre-kahve',
        name: 'Filtre Kahve',
        description: 'Taze çekilmiş kahve çekirdeklerinden damla damla',
        price: 40,
        image: '/images/products/filtre-kahve.jpg',
        category: 'sicak-icecekler',
      },
      {
        id: 'chai-latte',
        name: 'Chai Latte',
        description: 'Tarçın, zencefil ve baharat karışımlı latte',
        price: 48,
        image: '/images/products/chai-latte.jpg',
        category: 'sicak-icecekler',
      },
      {
        id: 'sicak-cikolata',
        name: 'Sıcak Çikolata',
        description: 'Belçika çikolatası ile hazırlanan kremamsı sıcak çikolata',
        price: 42,
        image: '/images/products/sicak-cikolata.jpg',
        category: 'sicak-icecekler',
      },
      {
        id: 'salep',
        name: 'Salep',
        description: 'Tarçınlı ve süt ile hazırlanmış geleneksel Türk salebi',
        price: 38,
        image: '/images/products/salep.jpg',
        category: 'sicak-icecekler',
      },
    ],
  },
  {
    id: 'soguk-icecekler',
    name: 'Soğuk İçecekler',
    description: 'Serinleten lezzetli içeceklerimiz',
    items: [
      {
        id: 'soguk-brew',
        name: 'Soğuk Brew',
        description: '12 saat demlenen özel kahvemiz',
        price: 52,
        image: '/images/products/soguk-brew.jpg',
        category: 'soguk-icecekler',
        popular: true,
      },
      {
        id: 'limonata',
        name: 'Ev Yapımı Limonata',
        description: 'Taze sıkılmış limon ve nane yaprakları ile',
        price: 38,
        image: '/images/products/limonata.jpg',
        category: 'soguk-icecekler',
        vegan: true,
      },
      {
        id: 'frappe',
        name: 'Frappe',
        description: 'Buzlu süt ve espresso karışımı',
        price: 50,
        image: '/images/products/frappe.jpg',
        category: 'soguk-icecekler',
      },
      {
        id: 'buzlu-cay',
        name: 'Buzlu Çay',
        description: 'Limon ve şeker ile servis edilen ev yapımı buzlu çay',
        price: 35,
        image: '/images/products/buzlu-cay.jpg',
        category: 'soguk-icecekler',
      },
      {
        id: 'gazoz',
        name: 'Ev Yapımı Gazoz',
        description: 'Doğal aromalarla yapılan serinletici gazoz',
        price: 42,
        image: '/images/products/gazoz.jpg',
        category: 'soguk-icecekler',
        vegan: true,
      },
      {
        id: 'mojito-alkolsuz',
        name: 'Alkolsüz Mojito',
        description: 'Nane, lime ve esmer şeker ile hazırlanan ferahlatıcı içecek',
        price: 48,
        image: '/images/products/alkolsuz-mojito.jpg',
        category: 'soguk-icecekler',
        vegan: true,
      },
    ],
  },
  {
    id: 'tatlilar',
    name: 'Tatlılar',
    description: 'Taze ve el yapımı tatlılarımız',
    items: [
      {
        id: 'san-sebastian',
        name: 'San Sebastian Cheesecake',
        description: 'Karamelize üstü ve kremamsı dokusu ile özel tarifimiz',
        price: 65,
        image: '/images/products/san-sebastian.jpg',
        category: 'tatlilar',
        popular: true,
      },
      {
        id: 'brownie',
        name: 'Brownie',
        description: 'Sıcak servis edilen çikolatalı brownie, yanında dondurma ile',
        price: 55,
        image: '/images/products/brownie.jpg',
        category: 'tatlilar',
      },
      {
        id: 'havuclu-kek',
        name: 'Havuçlu Kek',
        description: 'Tarçın ve ceviz ile zenginleştirilmiş havuçlu kek',
        price: 45,
        image: '/images/products/havuclu-kek.jpg',
        category: 'tatlilar',
        vegetarian: true,
      },
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'Mascarpone peyniri ve kahve ile hazırlanan İtalyan tatlısı',
        price: 62,
        image: '/images/products/tiramisu.jpg',
        category: 'tatlilar',
      },
      {
        id: 'sutlac',
        name: 'Fırın Sütlaç',
        description: 'Fırında kızartılmış, tarçınlı geleneksel sütlaç',
        price: 40,
        image: '/images/products/sutlac.jpg',
        category: 'tatlilar',
        vegetarian: true,
      },
      {
        id: 'profiterol',
        name: 'Profiterol',
        description: 'Çıtır hamur topları içine krema doldurulan, çikolata sosu ile servis edilir',
        price: 50,
        image: '/images/products/profiterol.jpg',
        category: 'tatlilar',
      },
    ],
  },
  {
    id: 'caylar',
    name: 'Çaylar',
    description: 'Geleneksel ve özel çay çeşitlerimiz',
    items: [
      {
        id: 'siyah-cay',
        name: 'Siyah Çay',
        description: 'Geleneksel demleme yöntemiyle hazırlanan siyah çay',
        price: 15,
        image: '/images/products/siyah-cay.jpg',
        category: 'caylar',
      },
      {
        id: 'yesil-cay',
        name: 'Yeşil Çay',
        description: 'Antioksidan bakımından zengin yeşil çay',
        price: 20,
        image: '/images/products/yesil-cay.jpg',
        category: 'caylar',
        vegan: true,
      },
      {
        id: 'ada-cayi',
        name: 'Ada Çayı',
        description: 'Taze ada çayı yaprakları ile demlenen bitkisel çay',
        price: 25,
        image: '/images/products/ada-cayi.jpg',
        category: 'caylar',
        vegan: true,
      },
      {
        id: 'ihlamur',
        name: 'Ihlamur Çayı',
        description: 'Boğaz ağrılarına iyi gelen, rahatlatıcı ıhlamur çayı',
        price: 22,
        image: '/images/products/ihlamur.jpg',
        category: 'caylar',
        vegan: true,
      },
      {
        id: 'kus-burnu',
        name: 'Kuşburnu Çayı',
        description: 'C vitamini açısından zengin, aromalı kuşburnu çayı',
        price: 24,
        image: '/images/products/kus-burnu.jpg',
        category: 'caylar',
        vegan: true,
      },
      {
        id: 'nane-limon',
        name: 'Nane Limon Çayı',
        description: 'Ferahlatıcı nane ve limon karışımı çay',
        price: 20,
        image: '/images/products/nane-limon.jpg',
        category: 'caylar',
        vegan: true,
      },
    ]
  },
  {
    id: 'geleneksel-kahveler',
    name: 'Geleneksel Kahveler',
    description: 'Türk kahvesi ve diğer geleneksel kahve çeşitlerimiz',
    items: [
      {
        id: 'dibek-kahvesi',
        name: 'Dibek Kahvesi',
        description: 'Taş değirmende öğütülmüş, ağır ateşte pişirilen dibek kahvesi',
        price: 40,
        image: '/images/products/dibek-kahvesi.jpg',
        category: 'geleneksel-kahveler',
        popular: true,
      },
      {
        id: 'menengiç-kahvesi',
        name: 'Menengiç Kahvesi',
        description: 'Menengiç ağacının meyvelerinden yapılan geleneksel kahve',
        price: 45,
        image: '/images/products/menengiç-kahvesi.jpg',
        category: 'geleneksel-kahveler',
      },
      {
        id: 'osmanli-kahvesi',
        name: 'Osmanlı Kahvesi',
        description: 'Misk, kakule ve damla sakızı ile tatlandırılmış kahve',
        price: 42,
        image: '/images/products/osmanli-kahvesi.jpg',
        category: 'geleneksel-kahveler',
      },
      {
        id: 'sutlu-turk-kahvesi',
        name: 'Sütlü Türk Kahvesi',
        description: 'Su yerine sütle hazırlanan yumuşak içimli Türk kahvesi',
        price: 38,
        image: '/images/products/sutlu-turk-kahvesi.jpg',
        category: 'geleneksel-kahveler',
      },
      {
        id: 'damla-sakizli-kahve',
        name: 'Damla Sakızlı Kahve',
        description: 'Damla sakızının kendine özgü aromasıyla zenginleştirilen kahve',
        price: 42,
        image: '/images/products/damla-sakizli-kahve.jpg',
        category: 'geleneksel-kahveler',
      },
      {
        id: 'cikolatali-turk-kahvesi',
        name: 'Çikolatalı Türk Kahvesi',
        description: 'Bitter çikolata eklenerek hazırlanan özel kahvemiz',
        price: 40,
        image: '/images/products/cikolatali-turk-kahvesi.jpg',
        category: 'geleneksel-kahveler',
      }
    ]
  },
  {
    id: 'dunya-kahveleri',
    name: 'Dünya Kahveleri',
    description: 'Dünyanın farklı bölgelerinden özel kahve çeşitlerimiz',
    items: [
      {
        id: 'espresso',
        name: 'Espresso',
        description: 'İtalyan usulü kısa kahve, yoğun lezzet',
        price: 28,
        image: '/images/products/espresso.jpg',
        category: 'dunya-kahveleri',
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso üzerine sıcak su ilave edilmiş kahve',
        price: 38,
        image: '/images/products/americano.jpg',
        category: 'dunya-kahveleri',
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Espresso, buharla ısıtılmış süt ve süt köpüğü ile',
        price: 42,
        image: '/images/products/cappuccino.jpg',
        category: 'dunya-kahveleri',
        popular: true,
      },
      {
        id: 'flat-white',
        name: 'Flat White',
        description: 'Avustralya kökenli, kadifemsi süt içinde yoğun espresso',
        price: 44,
        image: '/images/products/flat-white.jpg',
        category: 'dunya-kahveleri',
      },
      {
        id: 'macchiato',
        name: 'Macchiato',
        description: 'Espresso üzerine bir dokunuş süt köpüğü',
        price: 32,
        image: '/images/products/macchiato.jpg',
        category: 'dunya-kahveleri',
      },
      {
        id: 'cortado',
        name: 'Cortado',
        description: 'İspanya kökenli, eşit oranda espresso ve buharla ısıtılmış süt',
        price: 36,
        image: '/images/products/cortado.jpg',
        category: 'dunya-kahveleri',
      }
    ]
  },
  {
    id: 'meyve-sulari',
    name: 'Meyve Suları',
    description: 'Taze sıkılmış ve doğal meyve suları',
    items: [
      {
        id: 'portakal-suyu',
        name: 'Taze Sıkılmış Portakal Suyu',
        description: 'Günlük taze portakallardan sıkılmış C vitamini deposu',
        price: 38,
        image: '/images/products/portakal-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
        popular: true,
      },
      {
        id: 'nar-suyu',
        name: 'Taze Sıkılmış Nar Suyu',
        description: 'Antioksidan bakımından zengin, taze sıkım nar suyu',
        price: 42,
        image: '/images/products/nar-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
      },
      {
        id: 'elma-suyu',
        name: 'Elma Suyu',
        description: 'Yerli elmalardan yapılan taze sıkım elma suyu',
        price: 35,
        image: '/images/products/elma-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
      },
      {
        id: 'karisik-meyve-suyu',
        name: 'Karışık Meyve Suyu',
        description: 'Elma, havuç ve zencefil karışımı enerji veren içecek',
        price: 45,
        image: '/images/products/karisik-meyve-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
      },
      {
        id: 'ananas-suyu',
        name: 'Ananas Suyu',
        description: 'Taze ananaslardan hazırlanan ferahlatıcı meyve suyu',
        price: 40,
        image: '/images/products/ananas-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
      },
      {
        id: 'greyfurt-suyu',
        name: 'Greyfurt Suyu',
        description: 'Taze sıkılmış ekşimsi ve ferahlatıcı greyfurt suyu',
        price: 38,
        image: '/images/products/greyfurt-suyu.jpg',
        category: 'meyve-sulari',
        vegan: true,
      }
    ]
  },
  {
    id: 'tostlar',
    name: 'Tostlar',
    description: 'Özel ekmekle hazırlanan tost çeşitlerimiz',
    items: [
      {
        id: 'karisik-tost',
        name: 'Karışık Tost',
        description: 'Kaşar peyniri, sucuk, salam ve domates ile hazırlanan tost',
        price: 65,
        image: '/images/products/karisik-tost.jpg',
        category: 'tostlar',
        popular: true,
      },
      {
        id: 'kasarli-tost',
        name: 'Kaşarlı Tost',
        description: 'Bol kaşar peyniri ile hazırlanan tost',
        price: 55,
        image: '/images/products/kasarli-tost.jpg',
        category: 'tostlar',
        vegetarian: true,
      },
      {
        id: 'sebzeli-tost',
        name: 'Sebzeli Tost',
        description: 'Közlenmiş biber, patlıcan ve kaşar peyniri ile hazırlanan tost',
        price: 58,
        image: '/images/products/sebzeli-tost.jpg',
        category: 'tostlar',
        vegetarian: true,
      },
      {
        id: 'sucuklu-tost',
        name: 'Sucuklu Tost',
        description: 'Özel baharatlı sucuk ve kaşar peyniri ile hazırlanan tost',
        price: 60,
        image: '/images/products/sucuklu-tost.jpg',
        category: 'tostlar',
      },
      {
        id: 'avokadolu-tost',
        name: 'Avokadolu Tost',
        description: 'Ezilmiş avokado, beyaz peynir ve domates ile hazırlanan tost',
        price: 68,
        image: '/images/products/avokadolu-tost.jpg',
        category: 'tostlar',
        vegetarian: true,
      },
      {
        id: 'bazlama-tost',
        name: 'Bazlama Tost',
        description: 'Ev yapımı bazlama ekmeği ile hazırlanan özel peynirli tost',
        price: 62,
        image: '/images/products/bazlama-tost.jpg',
        category: 'tostlar',
        vegetarian: true,
      }
    ]
  },
  {
    id: 'soguk-kahveler',
    name: 'Soğuk Kahveler',
    description: 'Yaz aylarının vazgeçilmezi soğuk kahvelerimiz',
    items: [
      {
        id: 'iced-latte',
        name: 'Iced Latte',
        description: 'Soğuk süt ile hazırlanan buzlu latte',
        price: 48,
        image: '/images/products/iced-latte.jpg',
        category: 'soguk-kahveler',
      },
      {
        id: 'iced-americano',
        name: 'Iced Americano',
        description: 'Soğuk su ve buz ile hazırlanan americano',
        price: 42,
        image: '/images/products/iced-americano.jpg',
        category: 'soguk-kahveler',
      },
      {
        id: 'affogato',
        name: 'Affogato',
        description: 'Vanilyalı dondurma üzerine sıcak espresso',
        price: 52,
        image: '/images/products/affogato.jpg',
        category: 'soguk-kahveler',
        popular: true,
      },
      {
        id: 'dondurma-espresso',
        name: 'Espresso & Dondurma',
        description: 'Çikolatalı dondurma ve espresso karışımı',
        price: 55,
        image: '/images/products/dondurma-espresso.jpg',
        category: 'soguk-kahveler',
      },
      {
        id: 'frappuccino',
        name: 'Frappuccino',
        description: 'Kahve, buz, süt ve şeker karışımı içeceğin üzeri krema ile süslenir',
        price: 58,
        image: '/images/products/frappuccino.jpg',
        category: 'soguk-kahveler',
      },
      {
        id: 'buzlu-turk-kahvesi',
        name: 'Buzlu Türk Kahvesi',
        description: 'Soğutulmuş Türk kahvesi, süt ve buz karışımı',
        price: 45,
        image: '/images/products/buzlu-turk-kahvesi.jpg',
        category: 'soguk-kahveler',
      }
    ]
  }
];

export default menuData; 