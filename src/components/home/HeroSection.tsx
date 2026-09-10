import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Scissors } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onShopNow: () => void;
  onExplorePhilosophy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExplorePhilosophy,
}) => {
  const { t, language } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#f7f5f0] border-b border-stone-200/80">
      {/* Editorial Decorative Backdrop Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-300/60 text-stone-700 text-xs font-medium uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-stone-600" />
              <span>{language === 'bn' ? 'নারীদের আধুনিক এসেনশিয়ালস' : "Women's Contemporary Essentials"}</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-stone-900 leading-[1.08]">
              {language === 'bn' ? <>বিশুদ্ধ ফর্ম। <br /><span className="font-normal italic">পরিশীলিত কটন।</span> <br />চিরন্তন কাট।</> : <>Pure Form. <br /><span className="font-normal italic">Refined Cotton.</span> <br />Timeless Cut.</>}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {language === 'bn' ? 'আধুনিক স্বাচ্ছন্দ্যের জন্য তৈরি নারীদের টিশার্টের একটি পরিশীলিত কালেকশন। ১০০% কম্বড লং-স্ট্যাপল কটন, মজবুত কলার এবং আরামদায়ক ড্রেপে তৈরি।' : "An architectural wardrobe of mindful women's t-shirts. Crafted with 100% combed long-staple cotton, resilient rib-bound collars, and relaxed drape tailored for modern ease."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-[0.2em] rounded transition-all shadow-sm group"
              >
                <span>{t('shopCollection')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExplorePhilosophy}
                className="inline-flex items-center justify-center px-6 py-4 bg-transparent hover:bg-stone-200/50 text-stone-800 text-xs font-medium uppercase tracking-[0.2em] rounded border border-stone-300 transition-colors"
              >
                <span>{t('learnMore')}</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-stone-600 text-xs">
              <div className="flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-stone-800 flex-shrink-0" />
                <span>Pre-Shrunk 220 GSM</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-stone-800 flex-shrink-0" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                <span>Nationwide Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Visual Architectural Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-lg bg-stone-200/70 border border-stone-300/80 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Architectural grid markings */}
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-stone-500 font-mono">
                <span>Atelier Series 01</span>
                <span>Autumn / Winter</span>
              </div>

              {/* Center Silhouette Graphic Frame */}
              <div className="my-auto flex flex-col items-center justify-center text-center p-6 border border-dashed border-stone-400/50 rounded bg-[#faf9f6]/80 backdrop-blur-xs">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85" alt="Atelier t-shirt" className="w-32 h-36 object-cover rounded mb-4" referrerPolicy="no-referrer" />
                {/* Minimalist SVG T-Shirt Form */}
                <svg className="hidden w-28 h-28"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
                <h3 className="font-serif-display text-xl font-medium tracking-wide text-stone-900">
                  {language === 'bn' ? 'নির্বাচিত কালেকশন' : 'Selected Collection'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-[200px] leading-relaxed">
                  Discover our everyday silhouettes, designed for comfort, structure, and repeat wear.
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] tracking-wider text-stone-500 font-mono">
                <span>Combed Fiber Spec</span>
                <span>100% Organic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
