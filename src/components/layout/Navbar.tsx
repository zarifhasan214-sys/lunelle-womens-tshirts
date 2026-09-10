import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
}) => {
  const { itemCount: cartCount, openCart } = useCart();
  const { itemCount: wishlistCount, openWishlist } = useWishlist();
  const { t, toggleLanguage, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'shop', label: t('shop') },
    { id: 'new-arrivals', label: t('newArrivals') },
    { id: 'best-sellers', label: t('bestSellers') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-stone-900 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left group"
            >
              <span className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-wider uppercase text-stone-900 block leading-tight">
                Atelier
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-stone-500 font-medium block">
                {language === 'bn' ? 'উইমেন্স এসেনশিয়ালস' : "Women's Essentials"}
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button type="button" onClick={toggleLanguage} className="px-2.5 py-1.5 border border-stone-300 rounded text-[10px] font-semibold uppercase tracking-wider hover:bg-stone-100" aria-label="Toggle language">{language === 'en' ? 'বাংলা' : 'EN'}</button>
            {/* Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Icon with Counter */}
            <button
              type="button"
              onClick={openWishlist}
              className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Counter */}
            <button
              type="button"
              onClick={openCart}
              className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(4rem+1px)] sm:top-[calc(5rem+1px)] z-50 bg-[#faf9f6] border-b border-stone-200 px-6 py-8 shadow-xl transition-all">
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between py-2 text-sm uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium border-b border-stone-100"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-500 space-y-2">
            <p>Cash on Delivery Available Nationwide</p>
            <p>Support: assistance@atelier-femme.com</p>
          </div>
        </div>
      )}
    </header>
  );
};
