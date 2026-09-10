export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  colors: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  category: string;
  rating?: number;
  reviewsCount: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  fabricDetails?: string;
  careInstructions?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  silhouette: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  stock: number;
}

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  inStock: boolean;
  addedAt: string;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  productName?: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  district: string;
  area: string;
  fullAddress: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  createdAt: string;
  estimatedDelivery: string;
}

export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  inStockOnly?: boolean;
  searchQuery?: string;
}

export type ProductSortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'popular'
  | 'best-selling';
