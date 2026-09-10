import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-stone-900 text-stone-100 text-xs font-medium py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
          <span className="tracking-wide">
            {t('cashOnDelivery')} • {t('freeDelivery')}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white p-1 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
