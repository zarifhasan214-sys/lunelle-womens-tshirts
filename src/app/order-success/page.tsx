"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckIcon, TruckIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice } from "@/lib/products";

type Order = { number: string; name: string; email: string; address: string; city: string; state: string; postal: string; country: string; total: number; delivery: number; items: { name: string; quantity: number; price: number; color: string; size: string }[] };

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem("lunelle-last-order");
    if (saved) setOrder(JSON.parse(saved) as Order);
  }, []);

  const displayOrder = order ?? { number: "LN-240624", name: "there", email: "", address: "", city: "", state: "", postal: "", country: "", total: 0, delivery: 0, items: [] };
  return <><SiteHeader /><main className="success-page"><div className="success-mark"><CheckIcon size={28} /></div><p className="eyebrow">Order received / Thank you</p><h1>Thank you for<br /><em>your order.</em></h1><p className="success-lead">Your order has been successfully placed, {displayOrder.name.split(" ")[0] === "there" ? "and we’re so glad you’re here." : `${displayOrder.name.split(" ")[0]}.`}</p><div className="order-card"><div className="order-card-head"><span>Order number</span><strong>{displayOrder.number}</strong></div>{displayOrder.items.length ? displayOrder.items.map((item) => <div className="order-card-row" key={`${item.name}-${item.size}`}><span>{item.name} · {item.color} / {item.size} × {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>) : <div className="order-card-row"><span>Your Lunelle order</span><strong>Received</strong></div>}<div className="order-card-row"><span>Total</span><strong>{formatPrice(displayOrder.total)}</strong></div><div className="order-card-row"><span><TruckIcon size={14} /> Estimated delivery</span><strong>3–5 business days</strong></div></div><p className="success-delivery">A confirmation has been prepared for <strong>{displayOrder.email || "your inbox"}</strong>. We&apos;ll send tracking details when your order is on its way.</p><Link className="button" href="/shop">Continue shopping <CheckIcon size={15} /></Link></main><SiteFooter /></>;
}
