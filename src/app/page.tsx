import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import ProductsSection from "@/components/ProductsSection";
import StorySection from "@/components/StorySection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";
import siteConfigData from "@/config/site-config.json";
import type { SiteConfig } from "@/types/site-config";

const siteConfig = siteConfigData as SiteConfig;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffaf3] text-[#352119]">
      <Navbar
        siteName={siteConfig.site.name}
        homeUrl={siteConfig.site.homeUrl}
        config={siteConfig.navbar}
      />
      <main>
        <Hero config={siteConfig.hero} />
        <WhySection config={siteConfig.whySection} />
        <ProductsSection config={siteConfig.productsSection} />
        <StorySection config={siteConfig.storySection} />
        <ProductsSection config={siteConfig.parfaitsSection} sectionId="parfaits" />
        <AppDownloadSection config={siteConfig.appDownloadSection} />
      </main>
      <Footer siteName={siteConfig.site.name} config={siteConfig.footer} />
    </div>
  );
}
