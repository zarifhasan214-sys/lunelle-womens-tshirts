import { Suspense } from "react";
import { ShopPageClient } from "@/components/shop-page";

function ShopLoading() {
  return <main className="page-shell"><div className="page-intro"><div><p className="eyebrow">The collection</p><h1>Shop <em>all.</em></h1></div></div><div className="shop-loading">Loading the collection…</div></main>;
}

export default function ShopPage() {
  return <Suspense fallback={<ShopLoading />}><ShopPageClient /></Suspense>;
}
