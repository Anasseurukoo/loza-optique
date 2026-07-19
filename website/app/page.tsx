import Collections from "../components/collections/Collections";
import Hero from "../components/hero/Hero";
import Navbar from "../components/layout/Navbar";
import BrandSection from "../components/brands/BrandSection";
import {
  AboutSection,
  AppExperienceSection,
  ContactSection,
  HomeFooter,
  MobileStickyBar,
  ServicesSection,
} from "../components/PremiumSections";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BrandSection />
        <Collections />
        <ServicesSection />
        <AppExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>

      <HomeFooter />
      <MobileStickyBar />
    </>
  );
}
