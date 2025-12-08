import FeaturedListingShowcase from "@/components/FeaturesShowcase";
import HeroSection from "@/components/HeroSection";
import MobileAppPromotion from "@/components/MobileAppPromotion";
import PopularCities from "@/components/PopularCities";
import SearchSection from "@/components/SearchSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <PopularCities />
      <FeaturedListingShowcase />
      <Testimonials />
      <MobileAppPromotion />
    </div>
  );
}
