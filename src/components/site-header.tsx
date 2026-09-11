"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { useStore } from "@/components/store-context";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Collection", href: "/#new-collection" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "About", href: "/#story" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="announcement-bar">Free delivery on orders over $75 <span aria-hidden="true">✦</span></div>
      <header className="site-header">
        <div className="header-inner">
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileOpen(true)}><MenuIcon /></button>
          <Link className="wordmark" href="/" aria-label="Lunelle home">LUNELLE</Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <Link key={item.label} className={pathname === item.href ? "active" : ""} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><SearchIcon /></button>
            <Link className="icon-button icon-with-count" aria-label={`Wishlist, ${wishlist.length} items`} href="/shop?wishlist=true"><HeartIcon /><span className="header-count wishlist-count">{wishlist.length}</span></Link>
            <Link className="icon-button icon-with-count" aria-label={`Shopping bag, ${cartCount} items`} href="/cart"><BagIcon /><span className="header-count">{cartCount}</span></Link>
          </div>
        </div>
        {searchOpen && (
          <div className="search-panel">
            <form onSubmit={submitSearch} className="search-form">
              <SearchIcon size={18} />
              <input autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search the collection" aria-label="Search products" />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><CloseIcon size={18} /></button>
            </form>
          </div>
        )}
      </header>
      {mobileOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <div className="mobile-menu-head"><Link className="wordmark" href="/" onClick={() => setMobileOpen(false)}>LUNELLE</Link><button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><CloseIcon /></button></div>
          <nav className="mobile-nav">
            {navItems.map((item) => <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}<span>↗</span></Link>)}
          </nav>
          <div className="mobile-menu-footer"><Link href="/shop?wishlist=true" onClick={() => setMobileOpen(false)}>Wishlist <span>{wishlist.length}</span></Link><Link href="/cart" onClick={() => setMobileOpen(false)}>Shopping bag <span>{cartCount}</span></Link></div>
        </div>
      )}
    </>
  );
}
