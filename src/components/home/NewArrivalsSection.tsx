import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingBag, Plus } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { EmptyState } from '../common/EmptyState';
import { AddProductModal } from './AddProductModal';
import { useLanguage } from '../../context/LanguageContext';

interface NewArrivalsSectionProps {
  onViewAll: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onViewAll,
}) => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const items = await productService.getNewArrivals(4);
      setProducts(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
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
    <section className="py-16 sm:py-20 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
                Recent Releases
              </p>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-light">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-stone-700 hover:text-stone-950 border border-stone-300 hover:border-stone-500 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'পণ্য যোগ করুন' : 'Add Real Product'}</span>
            </button>
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-700 transition-colors"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs uppercase tracking-widest text-stone-400">
            Checking catalog...
          </div>
        ) : products.length === 0 ? (
          <div className="py-8">
            <EmptyState
              title="No products available yet"
              description="Our inaugural collection of women's tailored organic cotton t-shirts is in preparation. You can use the button below to add your genuine product items into inventory."
              actionText="+ Add First Real Product"
              onAction={() => setIsAddModalOpen(true)}
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
                  {/* Image Frame */}
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
                        <div className="w-12 h-12 rounded-full border border-stone-300 mx-auto flex items-center justify-center text-stone-400 mb-2">
                          <ShoppingBag className="w-5 h-5 stroke-[1.2]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">
                          Image Pending
                        </span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                          New
                        </span>
                      )}
                      {product.discountPercent && (
                        <span className="px-2 py-0.5 bg-rose-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                          -{product.discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
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

                  {/* Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif-display text-lg text-stone-900 font-medium line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-sm font-semibold text-stone-900">
                          ৳{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ৳{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        {product.stock > 0 ? (
                          <span className="text-emerald-700 font-medium">In Stock</span>
                        ) : (
                          <span className="text-rose-600 font-medium">Sold Out</span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        disabled={product.stock <= 0}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors"
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

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={() => loadProducts()}
      />
    </section>
  );
};
