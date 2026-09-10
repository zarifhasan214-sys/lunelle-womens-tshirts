import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Brand value propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-stone-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-400 text-xs">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-200 border border-stone-800">
              <Truck className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <p className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                Nationwide Courier
              </p>
              <p className="mt-0.5">Reliable 2-4 business day delivery with Cash on Delivery</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-200 border border-stone-800">
              <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <p className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                100% Combed Natural Fiber
              </p>
              <p className="mt-0.5">Pre-shrunk, heavyweight organic cotton with zero synthetic filler</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-200 border border-stone-800">
              <RefreshCw className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <p className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                Effortless 7-Day Exchange
              </p>
              <p className="mt-0.5">Hassle-free size replacement on all unworn garments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="font-serif-display text-2xl tracking-widest uppercase font-semibold text-stone-100 block">
                Atelier
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-stone-400 font-medium block">
                Women's Essentials
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Dedicated to designing pure, durable, and understated women's t-shirts. Each silhouette is constructed with tailored seams, custom dye baths, and long-staple cotton fibers.
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                Join The Private Registry
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-stone-300 text-xs bg-stone-900/90 py-2.5 px-3 rounded border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Thank you. You have been added to our private release list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-stone-900/90 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-l focus:outline-none focus:border-stone-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-stone-100 text-stone-950 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-stone-300 transition-colors rounded-r flex items-center"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Silhouettes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-4">
              Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Classic Crewneck
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Oversized Silhouette
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Supima V-Neck
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Structured Boxy Crop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Micro-Ribbed Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('order-tracking')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('size-guide')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('returns')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Customer Support
                </button>
              </li>
            </ul>
          </div>

          {/* House & Ethics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200 mb-4">
              House & Ethics
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Fiber Transparency
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="hover:text-stone-100 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} Atelier Women's Essentials. All rights reserved.</p>
        <div className="flex items-center space-x-6 text-[11px]">
          <span>Cash on Delivery</span>
          <span>•</span>
          <span>Pre-Shrunk Cotton</span>
          <span>•</span>
          <span>Dispatched from Dhaka</span>
        </div>
      </div>
    </footer>
  );
};
