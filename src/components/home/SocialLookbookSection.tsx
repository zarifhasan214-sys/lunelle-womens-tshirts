import React from 'react';
import { Camera } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SocialLookbookSection: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section className="py-16 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-2 text-stone-500 text-xs uppercase tracking-[0.25em] font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'কমিউনিটি কালেকশন' : 'Community Curations'}</span>
          </div>
          <h2 className="font-serif-display text-3xl text-stone-900 font-light">
            Worn In Daily Rituals
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Tag <span className="font-medium text-stone-900">@atelier.essentials</span> or use <span className="font-mono text-stone-900">#AtelierWomen</span> to be featured in our seasonal lookbook.
          </p>
        </div>

        {/* 4 Clean Editorial Lookbook Frames */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { tag: 'The Classic Crewneck', note: 'Curated Look 01' },
            { tag: 'The Oversized Drop', note: 'Curated Look 02' },
            { tag: 'The Supima V-Neck', note: 'Curated Look 03' },
            { tag: 'The Structured Boxy Crop', note: 'Curated Look 04' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group aspect-[4/5] bg-stone-200/60 rounded-lg border border-stone-300/80 p-5 flex flex-col justify-between hover:bg-stone-200 transition-colors"
            >
              <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-stone-500">
                <span>{item.note}</span>
                <span>Editorial</span>
              </div>

              <div className="text-center p-3 border border-dashed border-stone-400/40 rounded bg-[#faf9f6]/70">
                <Camera className="w-5 h-5 text-stone-500 mx-auto mb-1.5 stroke-[1.2]" />
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-medium">
                  Lookbook Frame
                </span>
              </div>

              <div className="text-[11px] text-stone-800 font-medium tracking-wide flex items-center justify-between">
                <span>{item.tag}</span>
                <span className="text-stone-400 group-hover:text-stone-900 transition-colors">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
