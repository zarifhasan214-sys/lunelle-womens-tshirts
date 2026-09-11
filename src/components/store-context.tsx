"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

type CartItem = {
  id: string;
  color: string;
  size: string;
  quantity: number;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  hydrated: boolean;
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("lunelle-cart");
      const savedWishlist = window.localStorage.getItem("lunelle-wishlist");
      if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist) as string[]);
    } catch {
      // A clean in-memory store is a graceful fallback when storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("lunelle-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("lunelle-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (product: Product, color: string = product.color, size = "S", quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.color === color && item.size === size);
      if (existing) {
        return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { id: product.id, color, size, quantity }];
    });
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setCart((current) => current.filter((item) => !(item.id === id && item.color === color && item.size === size)));
  };

  const updateQuantity = (id: string, color: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, color, size);
      return;
    }
    setCart((current) => current.map((item) => item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const toggleWishlist = (productId: string) => setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + (productPrice(item.id) * item.quantity), 0), [cart]);

  return (
    <StoreContext.Provider value={{ cart, wishlist, hydrated, cartCount, cartSubtotal, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isWishlisted }}>
      {children}
    </StoreContext.Provider>
  );
}

function productPrice(id: string) {
  // Kept in this module to ensure the context can calculate totals without a component render.
  // The catalog is static and shared by all routes.
  const product = productCatalog.find((item) => item.id === id);
  return product?.price ?? 0;
}

import { products as productCatalog } from "@/lib/products";

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

export function useCartProducts() {
  const { cart } = useStore();
  return cart.map((item) => ({ item, product: productCatalog.find((product) => product.id === item.id) })).filter((entry): entry is { item: CartItem; product: Product } => Boolean(entry.product));
}
