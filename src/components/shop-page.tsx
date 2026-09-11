"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchIcon, SlidersIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products, type ProductColor, type ProductCategory } from "@/lib/products";

type PriceFilter = "all" | "under30" | "30to35" | "35to40" | "over40";
type SortFilter = "newest" | "low" | "high" | "best";
const categories: ("All" | ProductCategory)[] = ["All", "Essential", "Relaxed", "Statement"];
const colors: ProductColor[] = ["Cream", "Black", "Rose", "Sage", "Brown"];
const sizes = ["XS", "S", "M", "L", "XL"];

export function ShopPageClient() {
  const params = useSearchParams();
  const { wishlist } = useStore();
  const [category, setCategory] = useState<"All" | ProductCategory>((params.get("category") as ProductCategory) || "All");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [sort, setSort] = useState<SortFilter>((params.get("sort") as SortFilter) || "newest");
  const [search, setSearch] = useState(params.get("search") || "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlistOnly] = useState(params.get("wishlist") === "true");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = !term || `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(term);
      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice = price === "all" || (price === "under30" && product.price < 30) || (price === "30to35" && product.price >= 30 && product.price <= 35) || (price === "35to40" && product.price > 35 && product.price <= 40) || (price === "over40" && product.price > 40);
      const matchesColor = !color || product.colors.includes(color as ProductColor);
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
      return matchesSearch && matchesCategory && matchesPrice && matchesColor && matchesWishlist;
    });
    return [...result].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "best" ? b.rating - a.rating : products.indexOf(a) - products.indexOf(b));
  }, [category, color, price, search, sort, wishlist, wishlistOnly]);

  const reset = () => { setCategory("All"); setPrice("all"); setSize(""); setColor(""); setSort("newest"); setSearch(""); };

  return (
    <>
      <SiteHeader />
      <main className="page-shell">
        <div className="page-intro"><div><p className="eyebrow">The collection</p><h1>Shop <em>all.</em></h1></div><p>Everyday essentials, thoughtfully designed. Find your new favorites in soft, considered fabrics.</p></div>
        <div className="shop-toolbar"><div className="shop-toolbar-left"><button className="filter-trigger" onClick={() => setMobileFiltersOpen(true)}><SlidersIcon size={15} /> Filters</button><span className="result-count">{filteredProducts.length} pieces</span></div><div className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value as SortFilter)} aria-label="Sort products"><option value="newest">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="best">Best Selling</option></select></div></div>
        <div className="shop-layout">
          <div className={`mobile-filter-backdrop ${mobileFiltersOpen ? "open" : ""}`} onClick={() => setMobileFiltersOpen(false)} />
          <aside className={`filters ${mobileFiltersOpen ? "open" : ""}`} aria-label="Product filters"><div className="filter-mobile-head"><strong>Filter by</strong><button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">×</button></div><FilterPanel category={category} setCategory={setCategory} price={price} setPrice={setPrice} size={size} setSize={setSize} color={color} setColor={setColor} reset={reset} /></aside>
          <section className="shop-products" aria-label="All products"><div className="shop-search"><SearchIcon size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" />{search && <button onClick={() => setSearch("")} aria-label="Clear search">×</button>}</div>{filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} showRating />)}</div> : <div className="no-results"><h2>Nothing found just yet.</h2><p>Try a different search or reset your filters.</p><button className="button" onClick={reset}>Reset filters</button></div>}</section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FilterPanel({ category, setCategory, price, setPrice, size, setSize, color, setColor, reset }: { category: "All" | ProductCategory; setCategory: (value: "All" | ProductCategory) => void; price: PriceFilter; setPrice: (value: PriceFilter) => void; size: string; setSize: (value: string) => void; color: string; setColor: (value: string) => void; reset: () => void }) {
  return <>
    <div className="filter-block"><h3>Category <span>⌄</span></h3>{categories.map((value) => <button className={`filter-option ${category === value ? "selected" : ""}`} key={value} onClick={() => setCategory(value)}>{value}</button>)}</div>
    <div className="filter-block"><h3>Price <span>⌄</span></h3>{([["all", "All prices"], ["under30", "Under $30"], ["30to35", "$30 – $35"], ["35to40", "$35 – $40"], ["over40", "Over $40"]] as [PriceFilter, string][]).map(([value, label]) => <button className={`filter-option ${price === value ? "selected" : ""}`} key={value} onClick={() => setPrice(value)}>{label}</button>)}</div>
    <div className="filter-block"><h3>Size <span>⌄</span></h3><div className="check-options">{sizes.map((value) => <label className="check-option" key={value}><input type="checkbox" checked={size === value} onChange={() => setSize(size === value ? "" : value)} />{value}</label>)}</div></div>
    <div className="filter-block"><h3>Color <span>⌄</span></h3>{colors.map((value) => <button className={`filter-option ${color === value ? "selected" : ""}`} key={value} onClick={() => setColor(color === value ? "" : value)}>{value}</button>)}</div>
    <button className="reset-button" onClick={reset}>Reset filters</button>
  </>;
}
