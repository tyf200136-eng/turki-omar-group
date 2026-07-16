import useLenis from "./hooks/useLenis.js";
import GlobalBackground from "./components/GlobalBackground.jsx";
import Header from "./components/Header.jsx";
import HeroLogoSection from "./sections/HeroLogoSection.jsx";
import CompanyCoverflowSection from "./sections/CompanyCoverflowSection.jsx";
import ServicesSection from "./sections/ServicesSection.jsx";
import ApproachSection from "./sections/ApproachSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";

function App() {
  useLenis();

  return (
    <>
      <GlobalBackground />
      <Header />

      <main className="relative">
        <HeroLogoSection />
        <div id="companies">
          <CompanyCoverflowSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <ApproachSection />
        <div id="contact">
          <ContactSection />
        </div>
        <FooterSection />
      </main>
    </>
  );
}

export default App;
