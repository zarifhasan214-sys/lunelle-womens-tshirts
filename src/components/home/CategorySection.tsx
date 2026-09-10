import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useLanguage } from '../../context/LanguageContext';

interface CategorySectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const { language } = useLanguage();
  const { t, language } = useLanguage();
  return (
    <section className="py-16 sm:py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2">
              Curated Silhouettes
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-light">
              Architectural Fits & Proportions
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-2 sm:mt-0 max-w-xs">
            Every neckline, shoulder slope, and hem length is calibrated for modern ease.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-stone-100/70 hover:bg-stone-100 rounded-lg p-7 border border-stone-200/90 transition-all duration-300 flex flex-col justify-between hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-stone-200/70 rounded text-stone-700">
                    Fit 0{index + 1}
                  </span>
                  <Layers className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
                </div>

                <h3 className="font-serif-display text-2xl text-stone-900 font-medium tracking-tight mb-2 group-hover:text-stone-950">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="text-stone-500 uppercase tracking-wider text-[11px] font-medium">
                  {cat.silhouette}
                </span>
                <span className="inline-flex items-center text-stone-900 font-medium group-hover:translate-x-1 transition-transform">
                  <span className="text-[11px] uppercase tracking-wider mr-1">{language === 'bn' ? 'দেখুন' : 'View'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
