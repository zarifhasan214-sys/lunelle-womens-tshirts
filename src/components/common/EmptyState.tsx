import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-stone-300/80 bg-stone-50/50 rounded-lg max-w-xl mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 mb-4 border border-stone-200">
        <Icon className="w-5 h-5 stroke-[1.5]" />
      </div>
      <h3 className="font-serif-display text-2xl font-medium tracking-tight text-stone-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-stone-600 leading-relaxed max-w-md mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white bg-stone-900 hover:bg-stone-800 transition-colors rounded"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
