"use client";

import Link from "next/link";
import { BagIcon, CheckCircleIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCartProducts, useStore } from "@/components/store-context";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const entries = useCartProducts();
  const { cartSubtotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const delivery = cartSubtotal >= 75 || cartSubtotal === 0 ? 0 : 7.99;
  const savings = entries.reduce((sum, { item, product }) => sum + ((product.originalPrice ?? product.price) - product.price) * item.quantity, 0);
  const listSubtotal = cartSubtotal + savings;
  const total = cartSubtotal + delivery;

  return <><SiteHeader /><main className="cart-page"><div className="cart-header"><div><p className="eyebrow">Lunelle / Your selection</p><h1>Your shopping <em>bag.</em></h1></div><p>{entries.length} {entries.length === 1 ? "piece" : "pieces"}</p></div>{entries.length === 0 ? <div className="empty-state"><div><div className="empty-state-mark"><BagIcon size={29} /></div><h2>Nothing here yet.</h2><p>Good things take time. Start with a piece made to be lived in.</p><Link href="/shop" className="button">Explore the collection</Link></div></div> : <div className="cart-layout"><section aria-label="Cart items"><div>{entries.map(({ item, product }) => <article className="cart-item" key={`${item.id}-${item.color}-${item.size}`}><Link className="cart-item-image" href={`/product/${product.slug}`}><img src={product.image} alt={product.name} /></Link><div className="cart-item-info"><Link href={`/product/${product.slug}`}><h2>{product.name}</h2></Link><p>Color <span>{item.color}</span></p><p>Size <span>{item.size}</span></p><div className="cart-item-controls"><div className="cart-quantity"><button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} aria-label="Decrease quantity"><MinusIcon size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} aria-label="Increase quantity"><PlusIcon size={13} /></button></div><button className="remove-button" onClick={() => removeFromCart(item.id, item.color, item.size)}>Remove</button></div></div><div className="cart-item-price">{formatPrice(product.price * item.quantity)}</div></article>)}</div><button className="clear-cart" onClick={clearCart}><TrashIcon size={12} /> Clear bag</button><Link className="continue-link" href="/shop">← Continue shopping</Link></section><aside className="summary-card"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatPrice(listSubtotal)}</span></div><div className="summary-row"><span>Discount</span><span className="sale-price">{savings ? `−${formatPrice(savings)}` : "—"}</span></div><div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span></div><div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div><div className="summary-note"><CheckCircleIcon size={15} /><span>{delivery === 0 ? "You qualify for free delivery." : `Add ${formatPrice(75 - cartSubtotal)} for free delivery.`}</span></div><Link className="button" href="/checkout">Proceed to checkout <PlusIcon size={15} /></Link><Link className="continue-link" href="/shop">Keep browsing</Link></aside></div>}</main><SiteFooter /></>;
}
