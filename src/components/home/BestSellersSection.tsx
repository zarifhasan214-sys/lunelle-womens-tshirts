import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingBag, Award } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { EmptyState } from '../common/EmptyState';
import { useLanguage } from '../../context/LanguageContext';

interface BestSellersSectionProps {
  onViewAll: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({ onViewAll }) => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const items = await productService.getBestSellers(4);
        setProducts(items);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleQuickAdd = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      selectedSize: product.sizes?.[0] || 'M',
      selectedColor: product.colors?.[0] || 'Standard',
      quantity: 1,
      stock: product.stock,
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#f7f5f0] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-3.5 h-3.5 text-stone-900" />
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
                Customer Favorites
              </p>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-light">
              Best Sellers
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-700 transition-colors mt-4 sm:mt-0"
          >
            <span>{t('exploreAll')}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs uppercase tracking-widest text-stone-400">
            Loading best sellers...
          </div>
        ) : products.length === 0 ? (
          <div className="py-8">
            <EmptyState
              icon={Award}
              title="No best sellers recorded yet"
              description="Best-selling pieces will automatically surface here as verified orders are placed and popular demand is calculated."
              actionText="Explore Collection"
              onAction={onViewAll}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => {
              const inWishlist = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-stone-200/90 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">
                          Image Pending
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                        Best Seller
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
                        inWishlist
                          ? 'bg-white text-rose-600'
                          : 'bg-white/80 hover:bg-white text-stone-700'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${inWishlist ? 'fill-rose-600 stroke-rose-600' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif-display text-lg text-stone-900 font-medium line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold text-stone-900">
                        ৳{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 font-medium">In Stock</span>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
