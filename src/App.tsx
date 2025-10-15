import CinematicHero from "./components/CinematicHero";
import CinematicStory from "./components/CinematicStory";
import Gallery from "./components/Gallery";
import UndergroundMenu from "./components/UndergroundMenu";
import LegendBegins from "./components/LegendBegins";
import CustomCursor from "./components/CustomCursor";
import "./App.css";
import "./components/App.css";

function App() {
  return (
    <div className="min-h-screen">
      {/* Custom Cursor - Renders once, affects entire page */}
      <CustomCursor />

      <CinematicHero />
      <CinematicStory />
      <Gallery />
      <UndergroundMenu />
      <LegendBegins />

      {/* Footer Semplice */}
      <footer className="relative bg-black py-20">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-serif text-white mb-4">
              L'Underground
            </h3>
            <p className="text-gray-400 italic text-lg">
              "Dove ogni cocktail racconta una storia, e ogni storia diventa una
              leggenda."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-pink-400 font-semibold mb-3">Indirizzo</h4>
              <p className="text-gray-400">
                Via Underground 123
                <br />
                Quartiere Neon, Milano 10001
              </p>
            </div>

            <div>
              <h4 className="text-green-400 font-semibold mb-3">Orari</h4>
              <p className="text-gray-400">
                Mer - Dom: 18:00 - 02:00
                <br />
                Chiuso Lun e Mar
              </p>
            </div>

            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Contatti</h4>
              <p className="text-gray-400">
                (555) COCKTAIL
                <br />
                info@lunderground.bar
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">
              © 2025 L'Underground. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
