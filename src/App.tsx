import { useIsMobile } from "./hooks/useIsMobile";
import CinematicHero from "./components/CinematicHero";
import CinematicStory from "./components/CinematicStory";
import CircularGallery from "./components/CircularGallery";
import UndergroundMenu from "./components/UndergroundMenu";
import RendezvousPoint from "./components/RendezvousPoint";
import LegendBegins from "./components/LegendBegins";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import OrbitalMenu from "./components/OrbitalMenu";
import ClientContactPopup from "./components/ClientContactPopup";
import "./App.css";
import "./components/App.css";

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Custom Cursor - Renders once, affects entire page */}
      <CustomCursor />

      {/* Mobile-Only Navigation - Conditional Rendering */}
      {isMobile && <OrbitalMenu />}

      <CinematicHero />
      <CinematicStory />

      {/* CircularGallery Section */}
      <section
        id="gallery"
        className="relative bg-black"
        style={{ height: "100vh" }}
      >
        <CircularGallery
          bend={3}
          textColor="#ff1493"
          borderRadius={0.05}
          scrollEase={0.04}
          font="bold 30px Playfair Display"
        />
      </section>

      <UndergroundMenu />
      <RendezvousPoint />
      <LegendBegins />
      <Footer />

      {/* Client Contact Popup */}
      <ClientContactPopup />
    </div>
  );
}

export default App;
