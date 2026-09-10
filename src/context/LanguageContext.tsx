import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

const translations = {
  en: {
    home: 'Home', shop: 'Shop', newArrivals: 'New Arrivals', bestSellers: 'Best Sellers', about: 'About', contact: 'Contact',
    wishlist: 'Wishlist', cart: 'Cart', search: 'Search', language: 'বাংলা', addToCart: 'Add to Cart', buyNow: 'Buy Now',
    inStock: 'In Stock', soldOut: 'Sold Out', viewAll: 'View All', exploreAll: 'Explore All', new: 'New', bestSeller: 'Best Seller',
    freeDelivery: 'Free delivery on orders over ৳2,000', cashOnDelivery: 'Cash on Delivery Available Nationwide',
    shopCollection: 'Shop Collection', learnMore: 'Learn More', selectSize: 'Select Size', selectColor: 'Select Color', quantity: 'Quantity',
    subtotal: 'Subtotal', delivery: 'Delivery', total: 'Total', proceedCheckout: 'Proceed to Checkout', remove: 'Remove',
    emptyCart: 'Your cart is empty', emptyCartDesc: 'Add a few pieces from our collection and they will appear here.', continueShopping: 'Continue Shopping',
    close: 'Close', writeReview: 'Write a Review', noReviews: 'No customer reviews yet',
  },
  bn: {
    home: 'হোম', shop: 'শপ', newArrivals: 'নতুন পণ্য', bestSellers: 'সেরা বিক্রিত', about: 'আমাদের সম্পর্কে', contact: 'যোগাযোগ',
    wishlist: 'উইশলিস্ট', cart: 'কার্ট', search: 'খুঁজুন', language: 'English', addToCart: 'কার্টে যোগ করুন', buyNow: 'এখনই কিনুন',
    inStock: 'স্টকে আছে', soldOut: 'স্টক শেষ', viewAll: 'সব দেখুন', exploreAll: 'সব পণ্য দেখুন', new: 'নতুন', bestSeller: 'বেস্ট সেলার',
    freeDelivery: '৳২,০০০-এর বেশি অর্ডারে ফ্রি ডেলিভারি', cashOnDelivery: 'সারা দেশে ক্যাশ অন ডেলিভারি',
    shopCollection: 'কালেকশন দেখুন', learnMore: 'আরও জানুন', selectSize: 'সাইজ নির্বাচন করুন', selectColor: 'রঙ নির্বাচন করুন', quantity: 'পরিমাণ',
    subtotal: 'সাবটোটাল', delivery: 'ডেলিভারি', total: 'মোট', proceedCheckout: 'চেকআউটে যান', remove: 'মুছে ফেলুন',
    emptyCart: 'আপনার কার্ট খালি', emptyCartDesc: 'আমাদের কালেকশন থেকে পছন্দের পণ্য যোগ করলে সেগুলো এখানে দেখা যাবে।', continueShopping: 'শপিং চালিয়ে যান',
    close: 'বন্ধ করুন', writeReview: 'রিভিউ লিখুন', noReviews: 'এখনও কোনো কাস্টমার রিভিউ নেই',
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = 'atelier_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'bn' ? 'bn' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore storage errors */ }
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'bn' : 'en');
  const t = (key: TranslationKey) => translations[language][key];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
