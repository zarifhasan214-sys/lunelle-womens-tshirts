import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LanguageProvider } from './context/LanguageContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { SearchModal } from './components/search/SearchModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleNavigate = (page: string) => { setActivePage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const page = activePage === 'home' ? <HomePage onNavigate={handleNavigate} /> : activePage === 'shop' ? <ShopPage /> : activePage === 'new-arrivals' ? <ShopPage mode="new" /> : activePage === 'best-sellers' ? <ShopPage mode="best" /> : activePage === 'cart' ? <CartPage onNavigate={handleNavigate} /> : activePage === 'checkout' ? <CheckoutPage onNavigate={handleNavigate} /> : <ShopPage />;
  return <LanguageProvider><CartProvider><WishlistProvider><div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#1c1917]"><AnnouncementBar /><Navbar activePage={activePage} onNavigate={handleNavigate} onOpenSearch={() => setIsSearchOpen(true)} /><div className="flex-1">{page}</div><Footer onNavigate={handleNavigate} /><CartDrawer onNavigate={handleNavigate} /><WishlistDrawer onNavigate={handleNavigate} /><SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={handleNavigate} /></div></WishlistProvider></CartProvider></LanguageProvider>;
}
