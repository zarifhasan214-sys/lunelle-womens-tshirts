import React from 'react';
import { Feather, Sparkles, Scissors, Leaf } from 'lucide-react';

export const BrandValuesSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-stone-400 text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Standard</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Constructed For Longevity
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            We reject disposable fast-fashion tees. Every t-shirt is calibrated with dense fiber counts, architectural neck bands, and resilient color fastness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-stone-800/60 rounded-lg border border-stone-700/60 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-700/60 flex items-center justify-center text-stone-200 mb-6 border border-stone-600">
                <Feather className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-display text-2xl font-medium text-white mb-2">
                Combed Long-Staple Cotton
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Spun from premium long-staple fibers that eliminate short coarse strands, resulting in an exceptionally soft surface that won't pill or fuzz after laundry cycles.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-700/80 text-[11px] font-mono uppercase tracking-widest text-stone-400">
              Spec: 220 GSM Jersey
            </div>
          </div>

          <div className="p-8 bg-stone-800/60 rounded-lg border border-stone-700/60 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-700/60 flex items-center justify-center text-stone-200 mb-6 border border-stone-600">
                <Scissors className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-display text-2xl font-medium text-white mb-2">
                Reinforced Neck Ribbing
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Collar bands are reinforced with 1x1 micro-ribbing and twin-needle binding to maintain a crisp, flat neckline that resists bacon-neck curling and stretching.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-700/80 text-[11px] font-mono uppercase tracking-widest text-stone-400">
              Form: Twin-Stitched Collar
            </div>
          </div>

          <div className="p-8 bg-stone-800/60 rounded-lg border border-stone-700/60 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-stone-700/60 flex items-center justify-center text-stone-200 mb-6 border border-stone-600">
                <Leaf className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-display text-2xl font-medium text-white mb-2">
                Pre-Shrunk & Non-Toxic Dyes
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Garments undergo garment-washing and bio-polishing before delivery. Our reactive low-impact dyes retain their rich color depth while remaining gentle on delicate skin.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-700/80 text-[11px] font-mono uppercase tracking-widest text-stone-400">
              Standard: Zero Heavy Metals
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
