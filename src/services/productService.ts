import { Product, ProductFilterOptions, ProductSortOption, CustomerReview } from '../types';
import { CATEGORIES } from '../data/categories';
import { DEFAULT_PRODUCTS } from '../data/products';

const STORAGE_KEY_PRODUCTS = 'atelier_real_products';
const STORAGE_KEY_REVIEWS = 'atelier_real_reviews';

class ProductService {
  private getStoredProducts(): Product[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (!raw) return DEFAULT_PRODUCTS;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS;
    } catch {
      return [];
    }
  }

  private saveStoredProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }

  private getStoredReviews(): CustomerReview[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private saveStoredReviews(reviews: CustomerReview[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }

  // Fetch all products with filter & sort options
  async getAllProducts(filters?: ProductFilterOptions, sort?: ProductSortOption): Promise<Product[]> {
    let products = this.getStoredProducts();

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        products = products.filter((p) => p.category === filters.category);
      }
      if (filters.minPrice !== undefined) {
        products = products.filter((p) => p.price >= (filters.minPrice ?? 0));
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
      }
      if (filters.size) {
        products = products.filter((p) => p.sizes.includes(filters.size as any));
      }
      if (filters.color) {
        products = products.filter((p) => p.colors.some((c) => c.toLowerCase() === filters.color?.toLowerCase()));
      }
      if (filters.inStockOnly) {
        products = products.filter((p) => p.stock > 0);
      }
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        products = products.filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
        case 'best-selling':
          products.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
          break;
        case 'newest':
        default:
          products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return products;
  }

  async getNewArrivals(limit = 4): Promise<Product[]> {
    const products = this.getStoredProducts();
    const newItems = products.filter((p) => p.isNew);
    const source = newItems.length > 0 ? newItems : products;
    return source.slice(0, limit);
  }

  async getBestSellers(limit = 4): Promise<Product[]> {
    const products = this.getStoredProducts();
    const bestItems = products.filter((p) => p.isBestSeller);
    const source = bestItems.length > 0 ? bestItems : products;
    return source.slice(0, limit);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = this.getStoredProducts();
    return products.find((p) => p.slug === slug) || null;
  }

  async createProduct(item: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const products = this.getStoredProducts();
    const newProduct: Product = {
      ...item,
      id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    this.saveStoredProducts(products);
    return newProduct;
  }

  async getCategories() {
    return CATEGORIES;
  }

  async getProductReviews(productId?: string): Promise<CustomerReview[]> {
    const reviews = this.getStoredReviews();
    if (!productId) {
      return reviews;
    }
    return reviews.filter((r) => r.productId === productId);
  }

  async addReview(reviewData: Omit<CustomerReview, 'id' | 'createdAt'>): Promise<CustomerReview> {
    const reviews = this.getStoredReviews();
    const newReview: CustomerReview = {
      ...reviewData,
      id: 'rev_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(newReview);
    this.saveStoredReviews(reviews);
    return newReview;
  }
}

export const productService = new ProductService();
