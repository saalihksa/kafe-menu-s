'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiTrash2, FiThumbsUp, FiThumbsDown, FiChevronRight, FiMoreHorizontal, FiImage, FiMoon, FiSun, FiEye, FiEyeOff, FiInfo, FiVolume2, FiVolumeX, FiSmile } from 'react-icons/fi';
import { RiRobot2Line, RiUserLine } from 'react-icons/ri';
import menuData from '@/data/menu';
import { categories } from '@/data/categories';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  type?: 'normal' | 'product-suggestion' | 'category-suggestion';
  options?: { text: string; value: string; icon?: React.ReactNode }[];
  products?: Array<{ name: string; price: number; description: string; category?: string; imageUrl?: string }>;
  isTyping?: boolean;
  feedback?: 'positive' | 'negative' | null;
};

type ConversationContext = {
  lastCategory?: string;
  lastProducts?: string[];
  preferences?: string[];
  searchHistory?: string[];
};

// Ses efektleri için URL'ler
const SOUND_EFFECTS = {
  messageReceived: '/sounds/message-received.mp3' // Sadece bot yanıtı için ses efekti bırakıyoruz
};

// Ses yönetimi için AudioContext ve ses havuzu
const audioPool: { [key: string]: HTMLAudioElement } = {};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Merhaba! SandWita menü asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?', 
      sender: 'bot',
      options: [
        { text: '🍔 Popüler ürünler', value: 'popüler ürünler' },
        { text: '🥪 Sandviç önerisi', value: 'sandviç öner' },
        { text: '🍰 Tatlı önerisi', value: 'tatlı öner' },
        { text: '☕️ İçecek önerisi', value: 'içecek öner' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    preferences: [],
    searchHistory: []
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // İlk ziyaret kontrolü
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Yazma önerilerini güncelleme
  const updateSuggestions = (input: string) => {
    const allSuggestions = [
      'Sandviç önerir misiniz?',
      'En popüler ürünler neler?',
      'Vejeteryan seçenekler var mı?',
      'Günün menüsü nedir?',
      'Tatlı çeşitleriniz neler?',
      'Fiyat listesi alabilir miyim?'
    ];
    
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filtered = allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSuggestions(event.target.value);
  };

  const handleOptionClick = (optionValue: string) => {
    stopAllSounds();
    handleUserMessage(optionValue);
  };
  
  const clearChat = () => {
    setMessages([
      { 
        id: Date.now(), 
        text: 'Sohbet geçmişi temizlendi. Size nasıl yardımcı olabilirim?', 
        sender: 'bot',
        options: [
          { text: '🍔 Popüler ürünler', value: 'popüler ürünler' },
          { text: '🥪 Sandviç önerisi', value: 'sandviç öner' },
          { text: '🍰 Tatlı önerisi', value: 'tatlı öner' },
          { text: '☕️ İçecek önerisi', value: 'içecek öner' }
        ]
      }
    ]);
    setConversationContext({
      preferences: [],
      searchHistory: []
    });
  };
  
  const handleFeedback = (messageId: number, feedbackType: 'positive' | 'negative') => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: feedbackType } 
          : msg
      )
    );
    
    if (feedbackType === 'negative') {
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            id: Date.now(), 
            text: 'Geri bildiriminiz için teşekkürler. Yanıtlarımı geliştirmek için bu bilgiyi kullanacağım.', 
            sender: 'bot' 
          }
        ]);
      }, 500);
    }
  };

  const getAllPopularProducts = () => {
    const popularProducts = menuData.flatMap(category => 
      category.items.filter(item => item.popular)
        .map(item => ({
          name: item.name,
          price: item.price,
          description: item.description,
          category: category.name,
          imageUrl: item.image
        }))
    );
    
    return popularProducts.length > 0 
      ? popularProducts 
      : menuData.flatMap(category => 
          category.items.slice(0, 1).map(item => ({
            name: item.name,
            price: item.price,
            description: item.description,
            category: category.name,
            imageUrl: item.image
          }))
        );
  };

  const getCategoryItems = (categoryName: string) => {
    const categoryMapping: Record<string, string> = {
      'sandvic': 'sandvicler',
      'sandviç': 'sandvicler',
      'tatli': 'tatlilar',
      'tatlı': 'tatlilar',
      'kahve': 'kahveler',
      'içecek': 'soft-icecekler',
      'icecek': 'soft-icecekler',
      'çay': 'caylar',
      'cay': 'caylar'
    };
    
    const normalizedCategoryName = Object.keys(categoryMapping).find(key => 
      categoryName.toLowerCase().includes(key)
    );
    
    const searchCategoryName = normalizedCategoryName 
      ? categoryMapping[normalizedCategoryName] 
      : categoryName;
    
    const category = menuData.find(cat => 
      cat.name.toLowerCase().includes(searchCategoryName.toLowerCase()) || 
      cat.id.toLowerCase().includes(searchCategoryName.toLowerCase())
    );
    
    if (category) {
      setConversationContext(prev => ({
        ...prev,
        lastCategory: category.name,
        lastProducts: category.items.map(item => item.name)
      }));
      
      const popularItems = category.items.filter(item => item.popular);
      const otherItems = category.items.filter(item => !item.popular);
      const randomOtherItems = otherItems.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      return [...popularItems, ...randomOtherItems].map(item => ({
        name: item.name,
        price: item.price,
        description: item.description,
        category: category.name,
        imageUrl: item.image
      }));
    }
    
    return [];
  };

  const getProductRecommendations = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const preferenceKeywords = [
      { key: 'vegan', value: 'vegan' }, { key: 'vejetaryen', value: 'vejetaryen' },
      { key: 'et', value: 'et' }, { key: 'tavuk', value: 'tavuk' }, { key: 'peynir', value: 'peynir' },
      { key: 'gluten', value: 'glutensiz' }, { key: 'sıcak', value: 'sıcak' }, { key: 'soğuk', value: 'soğuk' }
    ];
    const foundPreferences = preferenceKeywords.filter(p => lowerQuery.includes(p.key)).map(p => p.value);
    if (foundPreferences.length > 0) {
      setConversationContext(prev => ({ ...prev, preferences: [...(prev.preferences || []), ...foundPreferences] }));
    }
    let categoryKey = '';
    if (lowerQuery.includes('kahve') || lowerQuery.includes('coffee')) {
      categoryKey = lowerQuery.includes('soğuk') || lowerQuery.includes('soguk') || lowerQuery.includes('cold') ? 'soguk-kahveler' : 'kahveler';
    } else if (lowerQuery.includes('sandviç') || lowerQuery.includes('sandwich') || lowerQuery.includes('sandvic')) {
      categoryKey = 'sandvicler';
    } else if (lowerQuery.includes('tatlı') || lowerQuery.includes('tatli') || lowerQuery.includes('sweet') || lowerQuery.includes('desert')) {
      categoryKey = 'tatlilar';
    } else if (lowerQuery.includes('çay') || lowerQuery.includes('cay') || lowerQuery.includes('tea')) {
      categoryKey = 'caylar';
    } else if (lowerQuery.includes('içecek') || lowerQuery.includes('icecek') || lowerQuery.includes('drink') || lowerQuery.includes('soda')) {
      categoryKey = 'soft-icecekler';
    }
    setConversationContext(prev => ({ ...prev, searchHistory: [...(prev.searchHistory || []), query] }));
    if (categoryKey) return getCategoryItems(categoryKey);
    if (conversationContext.lastCategory && !categoryKey) {
      const contextBasedProducts = getCategoryItems(conversationContext.lastCategory);
      if (contextBasedProducts.length > 0) return contextBasedProducts;
    }
    return getAllPopularProducts();
  };

  const findProduct = (productName: string) => {
    const normalizedName = productName.toLowerCase().trim();
    for (const category of menuData) {
      for (const item of category.items) {
        if (item.name.toLowerCase() === normalizedName || normalizedName.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(normalizedName)) {
          return { ...item, category: category.name };
        }
      }
    }
    return null;
  };

  // Ses efekti çalma fonksiyonu
  const playSound = (soundType: keyof typeof SOUND_EFFECTS) => {
    if (!soundEnabled) return;

    try {
      // Eğer aynı ses zaten çalıyorsa, durdur ve baştan başlat
      if (audioPool[soundType]) {
        audioPool[soundType].pause();
        audioPool[soundType].currentTime = 0;
      }

      // Yeni ses örneği oluştur
      const audio = new Audio(SOUND_EFFECTS[soundType]);
      audio.volume = 0.2; // Ses seviyesini düşür
      
      // Maksimum süre sınırı (500ms)
      const MAX_DURATION = 0.5;
      
      // Ses çalma hatalarını yakala
      audio.onerror = () => {
        console.warn(`Ses efekti yüklenemedi: ${soundType}`);
        delete audioPool[soundType];
      };

      // Ses bittiğinde veya süre dolduğunda havuzdan kaldır
      audio.onended = () => {
        delete audioPool[soundType];
      };

      // Süre sınırlaması için zamanlayıcı
      const timer = setTimeout(() => {
        if (audioPool[soundType]) {
          audioPool[soundType].pause();
          delete audioPool[soundType];
        }
      }, MAX_DURATION * 1000);

      // Sesi havuza ekle ve çal
      audioPool[soundType] = audio;
      audio.play()
        .then(() => {
          // Başarıyla çalındı
        })
        .catch(() => {
          console.warn(`Ses efekti çalınamadı: ${soundType}`);
          delete audioPool[soundType];
          clearTimeout(timer);
        });

      // Temizlik işlemi
      return () => {
        clearTimeout(timer);
        if (audioPool[soundType]) {
          audioPool[soundType].pause();
          delete audioPool[soundType];
        }
      };
    } catch (error) {
      console.warn(`Ses efekti çalınırken hata oluştu: ${soundType}`, error);
    }
  };

  // Tüm sesleri durdur
  const stopAllSounds = () => {
    Object.values(audioPool).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    // Havuzu temizle
    Object.keys(audioPool).forEach(key => delete audioPool[key]);
  };

  // Chatbot kapatılırken sesleri durdur
  useEffect(() => {
    if (!isOpen) {
      stopAllSounds();
    }
    return () => {
      stopAllSounds();
    };
  }, [isOpen]);

  const generateBotResponse = (userMessage: string): Message => {
    stopAllSounds();
    // Sadece bot yanıt verdiğinde ses çal
    playSound('messageReceived');
    const lowerMessage = userMessage.toLowerCase();
    
    // Gelişmiş selamlaşma yanıtları
    if (['merhaba', 'selam', 'hello', 'hi', 'hey'].some(greet => lowerMessage.startsWith(greet))) {
      const hour = new Date().getHours();
      let greeting = '';
      if (hour >= 5 && hour < 12) greeting = 'Günaydın';
      else if (hour >= 12 && hour < 18) greeting = 'İyi günler';
      else if (hour >= 18 && hour < 22) greeting = 'İyi akşamlar';
      else greeting = 'İyi geceler';
      
      return { 
        id: Date.now(), 
        text: `${greeting}! Ben SandWita'nın akıllı menü asistanıyım. Size özel lezzet önerilerinde bulunabilirim. Ne tarz lezzetler arıyorsunuz?`, 
        sender: 'bot', 
        options: [
          { text: '🍔 Popüler ürünler', value: 'popüler ürünler' },
          { text: '🥪 Sandviç önerisi', value: 'sandviç öner' },
          { text: '🍰 Tatlı önerisi', value: 'tatlı öner' },
          { text: '☕️ İçecek önerisi', value: 'içecek öner' }
        ]
      };
    }

    // Gelişmiş teşekkür yanıtları
    if (['teşekkürler', 'teşekkür ederim', 'sağol', 'sağolun', 'thanks', 'thank you'].some(thanks => lowerMessage.includes(thanks))) {
      const responses = [
        'Rica ederim! Damak zevkinize uygun başka önerilerim de var.',
        'Ne demek, sizin memnuniyetiniz bizim için önemli! Başka ne önerebilirim?',
        'Ben teşekkür ederim! Umarım önerilerim işinize yaramıştır. Başka bir konuda yardımcı olabilir miyim?'
      ];
      return { 
        id: Date.now(), 
        text: responses[Math.floor(Math.random() * responses.length)], 
        sender: 'bot',
        options: [
          { text: '🥪 Yeni bir öneri al', value: 'öneri' },
          { text: '🌟 Günün menüsü', value: 'günün menüsü' },
          { text: '💝 Size özel', value: 'kişisel öneri' }
        ]
      };
    }

    // Gelişmiş sipariş yanıtları
    if (['sipariş', 'order', 'satın al', 'buy', 'alma'].some(term => lowerMessage.includes(term))) {
      return { 
        id: Date.now(), 
        text: 'Harika bir seçim! Siparişinizi hemen oluşturalım. Web sitemiz üzerinden güvenle sipariş verebilir veya size en yakın şubemizin numarasını paylaşabilirim. Nasıl yardımcı olabilirim?', 
        sender: 'bot', 
        options: [
          { text: '🌐 Online Sipariş', value: 'online sipariş' },
          { text: '📍 En yakın şube', value: 'şube bul' },
          { text: '📱 Telefonla Sipariş', value: 'telefon' }
        ]
      };
    }

    // Gelişmiş menü yanıtları
    if (['kategori', 'menü', 'menu', 'çeşitler'].some(term => lowerMessage.includes(term))) {
      const categoryOptions = categories.map(cat => ({
        text: `${cat.icon || '🍽️'} ${cat.title}`,
        value: `${cat.title} ürünleri`,
        icon: <FiChevronRight size={14} className="ml-1.5 opacity-80"/>
      }));
      
      return { 
        id: Date.now(), 
        text: 'İşte size özel hazırladığımız menü kategorilerimiz! Her damak zevkine uygun lezzetlerimiz mevcut. Hangi kategoriden başlamak istersiniz?', 
        sender: 'bot', 
        type: 'category-suggestion', 
        options: categoryOptions 
      };
    }

    // Gelişmiş fiyat sorgusu yanıtları
    if (['fiyat', 'kaç para', 'ne kadar', 'ücret'].some(term => lowerMessage.includes(term))) {
      const productKeywords = lowerMessage.replace(/fiyatı?|kaç para|ne kadar|ücreti?/g, '').trim().split(' ').filter(w => w.length > 2);
      for (const keyword of productKeywords) {
        const product = findProduct(keyword);
        if (product) {
          return { 
            id: Date.now(), 
            text: `${product.name} ürünümüzün fiyatı ${product.price}₺'dir. Bu ürünümüz ${product.description}. Yanında ne almak istersiniz?`, 
            sender: 'bot', 
            options: [
              { text: '🔍 Benzer Ürünler', value: `${product.category} ürünleri` },
              { text: '🛒 Sipariş Et', value: `sipariş ${product.name}` },
              { text: '🥤 İçecek Önerisi', value: 'içecek öner' }
            ]
          };
        }
      }
      return { 
        id: Date.now(), 
        text: 'Size en uygun fiyatlı ürünlerimizi önerebilirim. Ne tarz bir ürün arıyorsunuz?', 
        sender: 'bot', 
        options: [
          { text: '💰 Ekonomik Menü', value: 'ekonomik menü' },
          { text: '🥪 Sandviç Fiyatları', value: 'sandviç fiyatları' },
          { text: '☕️ İçecek Fiyatları', value: 'içecek fiyatları' }
        ]
      };
    }

    // Gelişmiş iletişim yanıtları
    if (['iletişim', 'telefon', 'adres', 'nerede', 'konum', 'yer'].some(term => lowerMessage.includes(term))) {
      return { 
        id: Date.now(), 
        text: 'SandWita olarak Ankara\'nın birçok noktasında sizlere hizmet veriyoruz! Size en yakın şubemizi bulalım veya müşteri hizmetlerimizle görüşmek ister misiniz?', 
        sender: 'bot', 
        options: [
          { text: '📍 En yakın şube', value: 'şube bul' },
          { text: '📱 Müşteri Hizmetleri', value: 'müşteri hizmetleri' },
          { text: '🗺️ Tüm Şubeler', value: 'şubeler' }
        ]
      };
    }

    // Gelişmiş diyet/alerji yanıtları
    if (['vegan', 'vejetaryen', 'glutensiz', 'gluten-free', 'alerji', 'allerjen'].some(term => lowerMessage.includes(term))) {
      return { 
        id: Date.now(), 
        text: 'Özel beslenme tercihlerinize uygun geniş bir menümüz var! Tüm ürünlerimizin içerikleri detaylı olarak belirtilmiştir. Size özel bir menü hazırlayalım!', 
        sender: 'bot', 
        options: [
          { text: '🥬 Vegan Menü', value: 'vegan ürünler öner' },
          { text: '🥗 Vejetaryen Menü', value: 'vejetaryen ürünler öner' },
          { text: '🌾 Glutensiz Menü', value: 'glutensiz ürünler öner' },
          { text: '📋 Besin İçerikleri', value: 'besin içerikleri' }
        ]
      };
    }

    // Gelişmiş öneri yanıtları
    if (['öner', 'tavsiye', 'önerin', 'ne yesem', 'ne içsem'].some(term => lowerMessage.includes(term))) {
      const recommendations = getProductRecommendations(lowerMessage);
      if (recommendations.length > 0) {
        const preferences = conversationContext.preferences || [];
        let responseText = preferences.length > 0 
          ? `Tercihlerinize (${preferences.join(', ')}) göre özel olarak seçtiğim lezzetler:` 
          : 'İşte sizin için özenle seçtiğim özel lezzetler:';
        return { 
          id: Date.now(), 
          text: responseText, 
          sender: 'bot', 
          type: 'product-suggestion', 
          products: recommendations 
        };
      }
    }

    // Varsayılan yanıt
    return { 
      id: Date.now(), 
      text: 'Size daha iyi yardımcı olabilmem için ne tarz bir lezzet aradığınızı söyleyebilir misiniz? Örneğin "sandviç önerisi" veya "tatlı önerisi" diyebilirsiniz.', 
      sender: 'bot', 
      options: [
        { text: '🥪 Sandviç Menüsü', value: 'sandviç öner' },
        { text: '☕️ Kahve Çeşitleri', value: 'kahve öner' },
        { text: '🍰 Tatlı Menüsü', value: 'tatlı öner' },
        { text: '👨‍🍳 Şef Önerileri', value: 'şef önerileri' }
      ]
    };
  };

  const handleUserMessage = (text: string) => {
    const newUserMessage = { id: Date.now(), text, sender: 'user' as const };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    const typingMessage: Message = { id: Date.now() + 1, text: '...', sender: 'bot', isTyping: true };
    setMessages(prevMessages => [...prevMessages, typingMessage]);
    const complexity = text.length > 20 ? 1200 : 700;
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(text);
      setMessages(prevMessages => prevMessages.filter(m => !m.isTyping).concat(botResponse));
    }, complexity);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    stopAllSounds();
    handleUserMessage(inputValue);
    setShowEmojiPicker(false);
    setSuggestions([]);
  };

  const chatbotContainerClasses = `
    fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px]
    bg-gradient-to-br from-white/95 to-amber-50/95
    flex flex-col z-50 transition-all duration-300 ease-in-out 
    shadow-[0_8px_32px_rgba(251,146,60,0.15)]
    backdrop-blur-xl
    sm:rounded-2xl 
    sm:h-[600px] md:h-[650px]
    animate-fadeIn
    z-[9999]
    border border-amber-100/30
    focus-within:ring-2 focus-within:ring-amber-300
    ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-0'}
  `;

  const headerClasses = `
    sticky top-0 z-20
    p-4 flex justify-between items-center sm:rounded-t-2xl
    bg-gradient-to-r from-amber-400 to-orange-500
    text-white
    relative
    overflow-hidden
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]
    before:opacity-20
    shadow-sm
  `;

  const messageAreaClasses = `
    flex-1 p-4 space-y-3 overflow-y-auto 
    bg-gradient-to-b from-amber-50/30 to-white/30
    scrollbar-thin scrollbar-thumb-amber-200/50 hover:scrollbar-thumb-amber-300
    scrollbar-track-transparent
    scroll-smooth
    pb-20 sm:pb-4
  `;

  const inputAreaClasses = `
    fixed bottom-0 left-0 right-0 sm:relative
    p-3 border-t 
    border-amber-100/30
    bg-white/90
    backdrop-blur-lg
    sm:rounded-b-2xl
    shadow-[0_-4px_10px_rgba(251,146,60,0.05)]
  `;

  const productCardClasses = `
    p-3 rounded-xl text-sm flex gap-3 items-start 
    border transition-all duration-300 ease-in-out cursor-pointer 
    bg-white/90
    backdrop-blur-sm
    border-amber-200/30
    hover:border-amber-300
    hover:shadow-lg hover:shadow-amber-500/5
    hover:scale-[1.01]
    group
  `;

  const quickReplyButtonClasses = `
    text-xs sm:text-sm px-3 py-2 rounded-lg
    border hover:shadow-sm active:scale-95 
    transition-all duration-200 ease-in-out touch-manipulation 
    flex items-center group 
    bg-gradient-to-r from-white/80 to-amber-50/80
    text-amber-700 border-amber-200/50
    hover:bg-amber-500 hover:text-white
    hover:border-amber-300
    hover:-translate-y-0.5
  `;

  const notificationPulseClasses = `
    absolute -top-1 -right-1
    w-3 h-3
    bg-red-500
    rounded-full
    animate-ping
  `;

  const notificationDotClasses = `
    absolute -top-1 -right-1
    w-3 h-3
    bg-red-500
    rounded-full
  `;

  // Hoş geldiniz mesajı geliştirmesi
  const WelcomeOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 rounded-3xl animate-fadeIn p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-[320px] text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
          <RiRobot2Line size={40} className="text-white animate-bounce" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">SandWita Asistana Hoş Geldiniz!</h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Size özel menü önerileri, kampanyalar ve daha fazlası için buradayım. 
          Hemen sohbete başlayalım!
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setShowWelcomeMessage(false)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium text-sm sm:text-base"
          >
            Sohbete Başla
          </button>
          {isFirstVisit && (
            <button
              onClick={() => {
                setShowWelcomeMessage(false);
                handleUserMessage('demo başlat');
              }}
              className="w-full bg-white text-amber-500 border-2 border-amber-500 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium text-sm sm:text-base"
            >
              Hızlı Demo İzle
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center text-white shadow-md hover:scale-110 transform"
          aria-label="Chat ile yardım alın"
        >
          <div className={notificationPulseClasses} />
          <div className={notificationDotClasses} />
          <FiMessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className={chatbotContainerClasses}>
          {showWelcomeMessage && <WelcomeOverlay />}
          <div className={headerClasses}>
            <div className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <RiRobot2Line size={24} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl tracking-tight">SandWita Asistan</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="hidden sm:inline">Çevrimiçi |</span> Size nasıl yardımcı olabilirim?
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center z-10">
              <button 
                onClick={clearChat} 
                className="text-white/90 hover:text-white hover:bg-white/20 p-2.5 rounded-xl transition-colors touch-manipulation backdrop-blur-xl"
                title="Sohbeti Temizle"
                aria-label="Sohbeti temizle"
              >
                <FiTrash2 size={20} />
              </button>
              <button 
                onClick={toggleChatbot} 
                className="text-white/90 hover:text-white hover:bg-white/20 p-2.5 rounded-xl transition-colors touch-manipulation backdrop-blur-xl" 
                title="Chatbot'u Kapat"
                aria-label="Chatbot'u kapat"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>

          <div ref={messageAreaRef} className={messageAreaClasses}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-messageIn`}
              >
                {message.sender === 'bot' && !message.isTyping && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mr-2 flex-shrink-0 shadow-md ring-2 ring-amber-400/10">
                    <RiRobot2Line size={18} className="animate-pulse" />
                  </div>
                )}
                
                <div 
                  className={`rounded-2xl p-4 max-w-[85%] shadow-lg text-sm sm:text-base leading-relaxed ${
                    message.sender === 'bot' 
                      ? message.isTyping 
                        ? 'bg-gray-100/80 text-gray-600 animate-pulse rounded-bl-none backdrop-blur-sm'
                        : 'bg-white/90 text-gray-800 rounded-bl-none backdrop-blur-sm' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-br-none shadow-amber-500/20'
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex space-x-2 py-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">{message.text}</p>
                      
                      {message.type === 'product-suggestion' && message.products && (
                        <div className="mt-4 space-y-3">
                          {message.products.map((product, index) => (
                            <div key={index} className={productCardClasses}>
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-amber-100 shadow-md group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    const placeholder = target.nextElementSibling as HTMLDivElement | null;
                                    if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                      placeholder.style.display = 'flex';
                                    }
                                  }}
                                />
                              ) : null}
                              <div 
                                className={`image-placeholder w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl items-center justify-center text-amber-300 border border-amber-100 shadow-md ${product.imageUrl ? 'hidden' : 'flex'}`}
                              >
                                <FiImage size={32} />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-amber-700 truncate text-base">{product.name}</div>
                                {product.description && (
                                  <div className="text-gray-600 text-sm mt-1 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                    {product.description}
                                  </div>
                                )}
                                <div className="flex justify-between items-center mt-3">
                                  <div className="text-amber-600 font-bold text-lg">{product.price}₺</div>
                                  {product.category && (
                                    <div className="text-xs text-orange-600 bg-orange-100/50 px-3 py-1 rounded-lg font-medium backdrop-blur-sm">
                                      {product.category}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.options && message.options.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option.value)}
                              className={quickReplyButtonClasses}
                            >
                              {option.text}
                              {option.icon && (
                                <span className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300">
                                  {option.icon}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {message.sender === 'bot' && !message.isTyping && !message.feedback && (
                        <div className="mt-3 flex justify-end items-center space-x-2">
                          <span className="text-xs text-gray-400">Yardımcı oldu mu?</span>
                          <button 
                            onClick={() => handleFeedback(message.id, 'positive')}
                            className="text-gray-400 hover:text-green-500 transition-colors p-2 rounded-lg hover:bg-green-50"
                            title="Bu yanıt yardımcı oldu"
                            aria-label="Bu yanıt yardımcı oldu"
                          >
                            <FiThumbsUp size={16} />
                          </button>
                          <button 
                            onClick={() => handleFeedback(message.id, 'negative')}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Bu yanıt yardımcı olmadı"
                            aria-label="Bu yanıt yardımcı olmadı"
                          >
                            <FiThumbsDown size={16} />
                          </button>
                        </div>
                      )}
                      
                      {message.feedback && (
                        <div className={`mt-2 text-xs text-right font-medium ${
                          message.feedback === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {message.feedback === 'positive' ? 'Geri bildiriminiz için teşekkürler! 👍' : 'Anlıyorum, daha iyisi için çalışacağım. 👎'}
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center ml-2 flex-shrink-0 shadow-md ring-2 ring-amber-400/10">
                    <RiUserLine size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={inputAreaClasses}>
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 bg-white border-t border-amber-100 rounded-t-xl p-2 shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(suggestion);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-amber-50 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2.5 rounded-xl transition-colors ${
                  soundEnabled ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-50'
                }`}
                title={soundEnabled ? 'Bildirimleri Kapat' : 'Bildirimleri Aç'}
              >
                {soundEnabled ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
              </button>
              
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Bir şeyler yazın..."
                  className="w-full px-3 py-2.5 pr-12 rounded-lg border border-amber-100 bg-white/90 shadow-inner focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-300 text-sm transition-all duration-200 ease-in-out hover:border-amber-200"
                  aria-label="Mesaj yazın"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-400 hover:text-amber-500 p-1.5 rounded-lg transition-colors"
                    title="Emoji Ekle"
                  >
                    <FiSmile size={18} />
                  </button>
                  
                  {inputValue.length > 0 && (
                    <button
                      onClick={() => setInputValue('')}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors"
                      title="Metni Temizle"
                    >
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className={`p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 touch-manipulation transition-all duration-200 ease-in-out shadow hover:shadow-md active:scale-95 ${
                  inputValue.trim() === '' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white'
                }`}
                aria-label="Mesaj Gönder"
              >
                <FiSend size={20} className="transform rotate-45" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 