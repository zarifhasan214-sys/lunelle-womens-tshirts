import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { NewsletterCapture } from "@/components/newsletter-capture";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

const categoryImages = [
  { title: "Essential", image: products[8].image, href: "/shop?category=Essential", copy: "The pieces you build around." },
  { title: "Relaxed", image: products[3].image, href: "/shop?category=Relaxed", copy: "Soft shapes for slow days." },
  { title: "Statement", image: products[6].image, href: "/shop?category=Statement", copy: "A little more to say." },
];

export default function HomePage() {
  const newCollection = [products[2], products[0], products[4], products[9]];
  const bestSellers = [products[0], products[6], products[1], products[10]];
  const featured = [products[8], products[3], products[11], products[5], products[7], products[9]];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-frame">
            <img className="hero-image" src="https://images.pexels.com/photos/9558716/pexels-photo-9558716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=2200" alt="Woman in a white Lunelle T-shirt and warm neutral trousers" />
            <div className="hero-content"><p className="eyebrow">The new everyday / 2024</p><h1 id="hero-title">Effortless.<br /><em>Essential.</em><br />Lunelle.</h1><p className="hero-subtitle">Elevated everyday T-shirts designed for comfort, confidence and timeless style.</p><div className="button-row"><Link href="/#new-collection" className="button button-light">Shop new collection <ArrowRightIcon size={16} /></Link><Link href="/#best-sellers" className="button button-light">Explore best sellers</Link></div></div>
            <span className="hero-mark">Everyday essentials, beautifully made.</span>
          </div>
        </section>

        <section className="home-section" id="new-collection" aria-labelledby="new-title">
          <div className="section-heading"><div><p className="eyebrow">Just arrived</p><h2 id="new-title">A softer take on <em>every day.</em></h2></div><Link href="/shop?sort=newest" className="section-link">View all new <ArrowUpRightIcon size={15} /></Link></div>
          <div className="product-grid">{newCollection.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>

        <section className="promo-section" aria-label="The everyday edit"><div className="promo-frame"><div><p className="eyebrow">The Lunelle edit</p><h2>THE EVERYDAY<br /><em>EDIT</em></h2><p>Essential T-shirts, refined for every day.</p><Link className="button" href="/shop">Shop the edit <ArrowRightIcon size={16} /></Link></div></div></section>

        <section className="home-section" id="best-sellers" aria-labelledby="best-title">
          <div className="section-heading"><div><p className="eyebrow">Most loved</p><h2 id="best-title">The ones you&apos;ll <em>live in.</em></h2></div><Link href="/shop?sort=best" className="section-link">Shop best sellers <ArrowUpRightIcon size={15} /></Link></div>
          <div className="product-grid">{bestSellers.map((product) => <ProductCard key={product.id} product={product} showRating />)}</div>
        </section>

        <section className="home-section" aria-labelledby="category-title"><div className="section-heading"><div><p className="eyebrow">Find your fit</p><h2 id="category-title">Made for your <em>everyday.</em></h2></div></div><div className="category-grid">{categoryImages.map((category) => <article className="category-card" key={category.title}><img src={category.image} alt={`${category.title} T-shirt edit`} loading="lazy" /><div className="category-content"><div><h3>{category.title}</h3><span>{category.copy}</span></div><Link href={category.href} aria-label={`Shop ${category.title}`}><ArrowUpRightIcon size={17} /></Link></div></article>)}</div></section>

        <section className="home-section" aria-labelledby="featured-title"><div className="section-heading"><div><p className="eyebrow">The full collection</p><h2 id="featured-title">Your new <em>uniform.</em></h2></div><Link href="/shop" className="section-link">Shop all T-shirts <ArrowUpRightIcon size={15} /></Link></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>

        <section className="home-section story-section" id="story" aria-labelledby="story-title"><div className="story-image"><img src="https://images.pexels.com/photos/17542870/pexels-photo-17542870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=950" alt="Lunelle T-shirt in a soft, minimal studio setting" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">The Lunelle way</p><h2 id="story-title">Designed for the moments that make up your <em>everyday.</em></h2><p>We believe the best pieces are the ones that quietly become part of your life. Lunelle makes elevated essentials from thoughtful fabrics, considered shapes and a softer point of view.</p><p>Less noise. Better materials. T-shirts that feel as good at day one as they do at one hundred.</p><Link href="/shop" className="section-link">Discover our story <ArrowUpRightIcon size={15} /></Link><div className="story-signature">Lunelle, with love.</div></div></section>

        <NewsletterCapture />
      </main>
      <SiteFooter />
    </>
  );
}
