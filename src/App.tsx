import { useIsMobile } from "./hooks/useIsMobile";
import CinematicHero from "./components/CinematicHero";
import CinematicStory from "./components/CinematicStory";
import Gallery from "./components/Gallery";
import UndergroundMenu from "./components/UndergroundMenu";
import RendezvousPoint from "./components/RendezvousPoint";
import LegendBegins from "./components/LegendBegins";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import OrbitalMenu from "./components/OrbitalMenu";
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
      <Gallery />
      <UndergroundMenu />
      <RendezvousPoint />
      <LegendBegins />
      <Footer />
    </div>
  );
}

export default App;
