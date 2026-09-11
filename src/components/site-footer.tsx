"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, InstagramIcon, TikTokIcon } from "@/components/icons";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div><p className="eyebrow">A little something in your inbox</p><h2>Stay in the<br /><em>Lunelle</em> loop.</h2></div>
        <div className="footer-signup"><p>Get first access to new collections, exclusive offers and seasonal edits.</p>{subscribed ? <div className="subscribed-message">Thank you — welcome to Lunelle.</div> : <form onSubmit={submit} className="newsletter-form"><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Email address" required /><button className="text-arrow-button" type="submit">Subscribe <ArrowUpRightIcon size={16} /></button></form>}</div>
      </div>
      <div className="footer-main">
        <div className="footer-brand"><Link className="wordmark footer-wordmark" href="/">LUNELLE</Link><p>Everyday essentials,<br />beautifully made.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><InstagramIcon size={18} /></a><a href="https://tiktok.com" aria-label="TikTok"><TikTokIcon size={18} /></a></div></div>
        <div className="footer-column"><h3>Explore</h3><Link href="/shop">Shop all</Link><Link href="/#new-collection">New collection</Link><Link href="/#best-sellers">Best sellers</Link><Link href="/#story">Our story</Link></div>
        <div className="footer-column"><h3>Help</h3><Link href="/shop">Shipping & returns</Link><Link href="/shop">Size guide</Link><Link href="/shop">Contact us</Link><Link href="/checkout">Secure checkout</Link></div>
        <div className="footer-column"><h3>Follow along</h3><a href="https://instagram.com">Instagram <ArrowUpRightIcon size={13} /></a><a href="https://tiktok.com">TikTok <ArrowUpRightIcon size={13} /></a><a href="mailto:hello@lunelle.example">hello@lunelle.example</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Lunelle Studio. All rights reserved.</span><div><Link href="/shop">Privacy policy</Link><Link href="/shop">Terms</Link></div><span>Designed for every day.</span></div>
    </footer>
  );
}
