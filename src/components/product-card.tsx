"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, PlusIcon, StarIcon } from "@/components/icons";
import { useStore } from "@/components/store-context";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product, showRating = false }: { product: Product; showRating?: boolean }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.id);

  const quickAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="product-image-link">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img className="product-image product-image-primary" src={product.image} alt={product.name} loading="lazy" />
          <img className="product-image product-image-hover" src={product.hoverImage} alt="" loading="lazy" />
        </Link>
        <button className={`wishlist-button ${wished ? "is-wished" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}><HeartIcon size={19} /></button>
        <button className={`quick-add-button ${added ? "is-added" : ""}`} onClick={quickAdd} aria-label={`Add ${product.name} to cart`}><span>{added ? "Added" : "Quick add"}</span><PlusIcon size={15} /></button>
      </div>
      <div className="product-meta">
        <div className="product-title-row"><Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link>{showRating && <span className="product-rating"><StarIcon size={11} /> {product.rating.toFixed(1)}</span>}</div>
        <div className="product-sub-row"><span>{product.category} · {product.color}</span><span className={product.originalPrice ? "sale-price" : ""}>{formatPrice(product.price)}{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</span></div>
      </div>
    </article>
  );
}
