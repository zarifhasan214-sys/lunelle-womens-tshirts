"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, LockIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCartProducts, useStore } from "@/components/store-context";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const entries = useCartProducts();
  const { cartSubtotal, clearCart } = useStore();
  const delivery = cartSubtotal >= 75 || cartSubtotal === 0 ? 0 : 7.99;
  const savings = entries.reduce((sum, { item, product }) => sum + ((product.originalPrice ?? product.price) - product.price) * item.quantity, 0);
  const total = cartSubtotal + delivery;
  const [payment, setPayment] = useState("cod");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", postal: "", country: "United States" });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = { number: `LN-${Math.floor(100000 + Math.random() * 899999)}`, ...form, payment, total, delivery, items: entries.map(({ item, product }) => ({ name: product.name, quantity: item.quantity, price: product.price, color: item.color, size: item.size })) };
    window.localStorage.setItem("lunelle-last-order", JSON.stringify(order));
    clearCart();
    router.push("/order-success");
  };

  if (!entries.length) return <><SiteHeader /><main className="checkout-page"><div className="empty-state"><div><h2>Your bag is waiting.</h2><p>Add something beautiful before checking out.</p><a className="button" href="/shop">Shop the collection</a></div></div></main><SiteFooter /></>;

  return <><SiteHeader /><main className="checkout-page"><div className="checkout-header"><p className="eyebrow">Lunelle / Secure checkout</p><h1>Complete your <em>order.</em></h1><p>Almost there. Your everyday essentials are ready to come home.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><section className="form-section"><h2>Customer information</h2><div className="field-grid"><Field label="Full name" required value={form.name} onChange={(value) => update("name", value)} /><Field label="Email address" type="email" required value={form.email} onChange={(value) => update("email", value)} /><Field label="Phone number" type="tel" required value={form.phone} onChange={(value) => update("phone", value)} /></div></section><section className="form-section"><h2>Shipping address</h2><div className="field-grid"><Field label="Address" required full value={form.address} onChange={(value) => update("address", value)} /><Field label="City" required value={form.city} onChange={(value) => update("city", value)} /><Field label="State / division" required value={form.state} onChange={(value) => update("state", value)} /><Field label="Postal code" required value={form.postal} onChange={(value) => update("postal", value)} /><label className="field"><span>Country</span><select value={form.country} onChange={(event) => update("country", event.target.value)}><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select></label></div></section><section className="form-section"><h2>Delivery method</h2><div className="radio-options"><label className="radio-option"><span><input type="radio" name="delivery" checked readOnly /> Standard delivery</span><strong>{delivery === 0 ? "Free" : "$7.99"}</strong></label><p className="payment-disclaimer"><CheckCircleIcon size={15} /> Orders over $75 automatically receive complimentary standard delivery.</p></div></section><section className="form-section"><h2>Payment method</h2><div className="radio-options"><label className="radio-option"><span><input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={(event) => setPayment(event.target.value)} /> Cash on delivery</span><strong>Available</strong></label><label className="radio-option"><span><input type="radio" name="payment" value="card-demo" checked={payment === "card-demo"} onChange={(event) => setPayment(event.target.value)} /> Card payment</span><strong>Demo</strong></label><label className="radio-option"><span><input type="radio" name="payment" value="online-demo" checked={payment === "online-demo"} onChange={(event) => setPayment(event.target.value)} /> Online payment</span><strong>Demo</strong></label></div><p className="payment-disclaimer"><LockIcon size={15} /> This is a demo checkout. No payment is processed and no card details are collected.</p></section><button className="button" type="submit">Place order <CheckCircleIcon size={16} /></button></form><aside className="checkout-summary"><h2>Order summary</h2>{entries.map(({ item, product }) => <div className="checkout-product" key={`${item.id}-${item.color}-${item.size}`}><div className="checkout-product-image"><img src={product.image} alt="" /><span className="checkout-qty">{item.quantity}</span></div><div><h3>{product.name}</h3><p>{item.color} · {item.size}</p></div><strong>{formatPrice(product.price * item.quantity)}</strong></div>)}<div className="summary-row" style={{ marginTop: 12 }}><span>Subtotal</span><span>{formatPrice(cartSubtotal + savings)}</span></div><div className="summary-row"><span>Discount</span><span className="sale-price">{savings ? `−${formatPrice(savings)}` : "—"}</span></div><div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span></div><div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div><div className="secure-message"><LockIcon size={13} /> Secure demo checkout</div></aside></div></main><SiteFooter /></>;
}

function Field({ label, value, onChange, type = "text", required = false, full = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; full?: boolean }) {
  return <label className={`field ${full ? "full" : ""}`}><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} /></label>;
}
