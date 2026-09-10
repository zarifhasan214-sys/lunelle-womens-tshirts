import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmptyState } from '../common/EmptyState';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    onNavigate('checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    onNavigate('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#faf9f6]">
            <div>
              <h2 className="font-serif-display text-xl font-medium tracking-tight text-stone-900">
                Shopping Bag
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-12">
                <EmptyState
                  icon={ShoppingBag}
                  title="Your bag is empty"
                  description="You have not added any pieces to your bag yet. Discover our collection of pure cotton essentials."
                  actionText="Explore Collection"
                  onAction={handleContinueShopping}
                />
              </div>
            ) : (
              <div className="divide-y divide-stone-200/80">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex space-x-4 first:pt-0">
                    <div className="w-20 h-24 bg-stone-100 rounded border border-stone-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">
                            No Image
                          </span>
                        </div>
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
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-1 flex items-center space-x-2 text-xs text-stone-500">
                          <span>Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span>Color: {item.selectedColor}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-stone-900">
                          ৳{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-3">
                        <div className="flex items-center border border-stone-300 rounded bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-stone-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs text-stone-500">
                          Subtotal: ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#f7f5f0] space-y-4">
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-stone-900 font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-semibold">Complimentary</span>
                    ) : (
                      `৳${deliveryCharge}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200/80 flex justify-between text-sm font-semibold text-stone-900">
                  <span>Estimated Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-widest rounded transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleContinueShopping}
                  className="w-full py-2.5 px-4 text-stone-600 hover:text-stone-900 text-xs font-medium uppercase tracking-wider transition-colors text-center"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
