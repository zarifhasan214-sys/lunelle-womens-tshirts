import React, { useEffect, useMemo, useState } from 'react';
import { Heart, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { productService } from '../services/productService';
import { Product, ProductSortOption } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

export const ShopPage: React.FC<{ mode?: 'all' | 'new' | 'best' }> = ({ mode = 'all' }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<ProductSortOption>('newest');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    productService.getAllProducts({ category, searchQuery: query }, sort).then(all => {
      setProducts(mode === 'new' ? all.filter(p => p.isNew) : mode === 'best' ? all.filter(p => p.isBestSeller) : all);
    });
  }, [category, query, sort, mode]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  return (
    <main className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2">Atelier Collection</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl text-stone-900 font-light">{t('shop')}</h1>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden inline-flex items-center gap-2 px-3 py-2 border border-stone-300 rounded text-xs uppercase tracking-wider font-semibold"><SlidersHorizontal className="w-4 h-4" /> Filters</button>
            <select value={sort} onChange={e => setSort(e.target.value as ProductSortOption)} className="px-3 py-2 bg-white border border-stone-300 rounded text-xs outline-none">
              <option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          <aside className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-28 bg-white border border-stone-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4"><h2 className="text-xs font-semibold uppercase tracking-widest">Categories</h2><button className="md:hidden" onClick={() => setFiltersOpen(false)} aria-label={t('close')}><X className="w-4 h-4" /></button></div>
              <div className="space-y-2">
                {categories.map(cat => <button key={cat} type="button" onClick={() => setCategory(cat)} className={`block w-full text-left px-3 py-2 rounded text-xs ${category === cat ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'}`}>{cat === 'all' ? 'All Products' : cat}</button>)}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-5 flex gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="w-full bg-white border border-stone-300 rounded px-4 py-3 text-sm outline-none focus:border-stone-800" />
            </div>
            {products.length === 0 ? <div className="py-20 text-center text-stone-500">No products found.</div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => {
                const wished = isInWishlist(product.id);
                return <article key={product.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden group">
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <button type="button" onClick={() => toggleWishlist(product)} aria-label={t('wishlist')} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm"><Heart className={`w-4 h-4 ${wished ? 'fill-rose-600 text-rose-600' : ''}`} /></button>
                    {product.isNew && <span className="absolute top-3 left-3 px-2 py-1 bg-stone-900 text-white text-[10px] uppercase tracking-wider rounded">{t('new')}</span>}
                  </div>
                  <div className="p-4"><p className="text-[11px] uppercase tracking-wider text-stone-500">{product.category}</p><h2 className="font-serif-display text-xl mt-1">{product.name}</h2><div className="flex items-center justify-between mt-3"><span className="font-semibold">৳{product.price.toLocaleString()}</span><button type="button" disabled={!product.stock} onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.images[0], selectedSize: product.sizes[0], selectedColor: product.colors[0], quantity: 1, stock: product.stock })} className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-white rounded text-xs disabled:bg-stone-300"><ShoppingBag className="w-3.5 h-3.5" /> {t('addToCart')}</button></div></div>
                </article>;
              })}
            </div>}
          </section>
        </div>
      </div>
    </main>
  );
};
