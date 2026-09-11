"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckCircleIcon, ChevronRightIcon, HeartIcon, MinusIcon, PlusIcon, StarIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store-context";
import { formatPrice, products, type Product } from "@/lib/products";

const colorMap: Record<string, string> = { Cream: "#eee8dc", Black: "#272625", Rose: "#d2a3a0", Sage: "#a9b8a2", Brown: "#8b6851" };
const sizes = ["XS", "S", "M", "L", "XL"];

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");
  const [added, setAdded] = useState(false);

  const add = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  const buy = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push("/checkout");
  };
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.color === product.color)).slice(0, 4);

  return (
    <>
      <div className="product-detail">
        <div className="product-gallery"><div className="gallery-thumbs">{product.gallery.map((image, index) => <button className={`gallery-thumb ${selectedImage === index ? "active" : ""}`} key={image} onClick={() => setSelectedImage(index)} aria-label={`View image ${index + 1}`}><img src={image} alt="" /></button>)}</div><div className="gallery-main"><img src={product.gallery[selectedImage]} alt={product.name} /><span className="zoom-note">Hover to zoom</span></div></div>
        <div className="product-detail-copy"><p className="eyebrow">{product.category} / Lunelle essentials</p><h1>{product.name}</h1><div className="rating-line"><span className="stars">{Array.from({ length: 5 }).map((_, index) => <StarIcon key={index} size={12} />)}</span><span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span></div><div className="price-line"><span className={product.originalPrice ? "sale-price" : ""}>{formatPrice(product.price)}</span>{product.originalPrice && <><del>{formatPrice(product.originalPrice)}</del><span className="sale-chip">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span></>}</div><p className="detail-description">{product.description}</p>
          <div className="selector-block"><div className="selector-label">Color <span>{selectedColor}</span></div><div className="color-options">{product.colors.map((color) => <button key={color} className={`color-option ${selectedColor === color ? "selected" : ""}`} style={{ "--color": colorMap[color] } as CSSProperties} onClick={() => setSelectedColor(color)}>{color}</button>)}</div></div>
          <div className="selector-block"><div className="selector-label">Size <span><a href="#size-guide">Size guide</a></span></div><div className="size-options">{sizes.map((size) => <button key={size} className={`size-option ${selectedSize === size ? "selected" : ""}`} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
          <div className="quantity-row"><span className="selector-label">Quantity</span><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><MinusIcon size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><PlusIcon size={14} /></button></div></div>
          <div className="detail-actions"><button className="button" onClick={add}>{added ? "Added to bag" : "Add to bag"} <ArrowRightIcon size={15} /></button><button className="button secondary" onClick={buy}>Buy now</button></div><button className={`detail-wishlist ${isWishlisted(product.id) ? "active" : ""}`} onClick={() => toggleWishlist(product.id)}><HeartIcon size={17} /> {isWishlisted(product.id) ? "Saved to wishlist" : "Add to wishlist"}</button>
          <div className="product-perks"><div className="product-perk"><CheckCircleIcon size={16} /><span>Premium cotton fabric, soft and breathable</span></div><div className="product-perk"><TruckIcon size={16} /><span>Free delivery on orders over $75</span></div><div className="product-perk"><ArrowRightIcon size={16} /><span>Easy 30-day returns, always</span></div></div>
        </div>
      </div>
      <section className="details-section"><div className="detail-tabs">{(["description", "details", "shipping"] as const).map((tab) => <button className={`detail-tab ${activeTab === tab ? "active" : ""}`} key={tab} onClick={() => setActiveTab(tab)}>{tab === "shipping" ? "Shipping & returns" : tab}</button>)}</div><div className="tab-content">{activeTab === "description" && <p>{product.description} Thoughtfully made to become the piece you reach for without thinking. It moves with your day, layers beautifully, and holds its shape wash after wash.</p>}{activeTab === "details" && <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}{activeTab === "shipping" && <p>Orders ship within 1–2 business days. Enjoy complimentary standard delivery on orders over $75, or $7.99 otherwise. If it&apos;s not quite right, returns are easy within 30 days.</p>}</div></section>
      <section className="reviews-section"><div className="reviews-summary"><p className="eyebrow">Customer notes</p><h3>{product.rating.toFixed(1)} / 5</h3><span className="stars">{Array.from({ length: 5 }).map((_, index) => <StarIcon key={index} size={13} />)}</span><p>Based on {product.reviewCount} reviews</p><div className="review-bars"><div className="review-bar"><span>5</span><i style={{ width: "92%" }} /><span>92%</span></div><div className="review-bar"><span>4</span><i style={{ width: "7%" }} /><span>7%</span></div><div className="review-bar"><span>3</span><i style={{ width: "1%" }} /><span>1%</span></div></div></div><div className="review-list"><article className="review"><div className="review-head"><strong>Clara M. <span>Verified buyer</span></strong><span>May 2024</span></div><span className="stars"><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /></span><p>“The kind of tee that makes everything else in my wardrobe work harder. Beautifully soft.”</p></article><article className="review"><div className="review-head"><strong>Isabelle R. <span>Verified buyer</span></strong><span>April 2024</span></div><span className="stars"><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /><StarIcon size={11} /></span><p>“Perfect fit and the color is even more beautiful in person. I&apos;ll be ordering another.”</p></article><button className="section-link" type="button">Write a review <ChevronRightIcon size={15} /></button></div></section>
      <section className="related-section"><h2>You may also like.</h2><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>
    </>
  );
}
