import Collections from "../components/Collections";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
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

      <main id="top" className="pb-20 md:pb-0">
        <Hero />
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
