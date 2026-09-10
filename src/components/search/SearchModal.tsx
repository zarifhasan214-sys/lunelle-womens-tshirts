import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { EmptyState } from '../common/EmptyState';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const hits = await productService.getAllProducts({ searchQuery: query });
        setResults(hits);
        setHasSearched(true);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative bg-[#faf9f6] w-full max-w-2xl rounded-lg shadow-2xl border border-stone-200 overflow-hidden">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, color, or fabric..."
              className="flex-1 bg-transparent text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-stone-400 hover:text-stone-700 transition-colors text-xs uppercase"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center text-xs text-stone-500 uppercase tracking-widest animate-pulse">
                Searching inventory...
              </div>
            ) : !hasSearched && !query ? (
              <div className="py-8 text-center">
                <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                  Popular Categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Classic Crewneck', 'Oversized Silhouette', 'Supima V-Neck', 'Boxy Crop'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setQuery(cat)}
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-8">
                <EmptyState
                  title="No products found"
                  description={`No catalog items match "${query}". Try searching for categories like crewneck, oversized, or supima.`}
                  actionText="Browse Shop"
                  onAction={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                />
              </div>
            ) : (
              <div className="divide-y divide-stone-200/80">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="py-3 flex items-center justify-between group cursor-pointer hover:bg-stone-100/60 px-3 rounded transition-colors"
                    onClick={() => {
                      onClose();
                      onNavigate('shop');
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-14 bg-stone-100 rounded border border-stone-200 flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[9px] text-stone-400 uppercase">No Img</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-stone-900 group-hover:text-stone-700">
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-stone-900">
                        ৳{product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
