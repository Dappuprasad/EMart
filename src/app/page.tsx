import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
    </Layout>
  );
}
