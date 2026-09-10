import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { BrandValuesSection } from '../components/home/BrandValuesSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { SocialLookbookSection } from '../components/home/SocialLookbookSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection
        onShopNow={() => onNavigate('shop')}
        onExplorePhilosophy={() => {
          const el = document.getElementById('brand-philosophy');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Curated Silhouettes / Category Section */}
      <CategorySection
        onSelectCategory={(_slug) => {
          onNavigate('shop');
        }}
      />

      {/* 3. New Arrivals (Real data architecture with graceful empty state) */}
      <NewArrivalsSection
        onViewAll={() => onNavigate('shop')}
      />

      {/* 4. Best Sellers */}
      <BestSellersSection
        onViewAll={() => onNavigate('shop')}
      />

      {/* 5. Brand Philosophy & Craft Standards */}
      <div id="brand-philosophy">
        <BrandValuesSection />
      </div>

      {/* 6. Customer Impressions / Reviews */}
      <CustomerReviewsSection />

      {/* 7. Community Lookbook */}
      <SocialLookbookSection />

      {/* 8. Newsletter Registry */}
      <NewsletterSection />
    </main>
  );
};
