import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { EmptyState } from '../common/EmptyState';

interface WishlistDrawerProps {
  onNavigate: (page: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onNavigate }) => {
  const { items, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (item: any) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      selectedSize: 'M',
      selectedColor: 'Default',
      quantity: 1,
      stock: 10,
    });
    removeFromWishlist(item.productId);
  };

  const handleBrowse = () => {
    closeWishlist();
    onNavigate('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-stone-200">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="font-serif-display text-xl font-medium tracking-tight text-stone-900">
                Saved Items
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {items.length} {items.length === 1 ? 'piece' : 'pieces'} in your wishlist
              </p>
            </div>
            <button
              type="button"
              onClick={closeWishlist}
              className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-12">
                <EmptyState
                  icon={Heart}
                  title="Your wishlist is empty"
                  description="Save items you love to keep track of your personal curated wardrobe."
                  actionText="Explore Collection"
                  onAction={handleBrowse}
                />
              </div>
            ) : (
              <div className="divide-y divide-stone-200/80">
                {items.map((item) => (
                  <div key={item.productId} className="py-4 flex space-x-4 first:pt-0">
                    <div className="w-20 h-24 bg-stone-100 rounded border border-stone-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">
                          No Image
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-stone-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(item.productId)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-stone-500">{item.category}</p>
                        <p className="mt-1 text-sm font-medium text-stone-900">
                          ৳{item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => handleMoveToBag(item)}
                          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-stone-700 transition-colors py-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
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
