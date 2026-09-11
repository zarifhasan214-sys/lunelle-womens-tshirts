import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProduct } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} — Lunelle` : "Product — Lunelle", description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <><SiteHeader /><main className="product-page"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/shop">Shop</a><span>/</span><span>{product.name}</span></div><ProductDetail product={product} /></main><SiteFooter /></>;
}
