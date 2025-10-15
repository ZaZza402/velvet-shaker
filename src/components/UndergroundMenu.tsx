import { useEffect, useRef, useState } from "react";
import CocktailCard from "./CocktailCard";
import NeonGridBackground from "./NeonGridBackground";
import "./UndergroundMenu.css";

const UndergroundMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cocktails = [
    {
      name: "Sogni Neon",
      price: "€18",
      ingredients: "Vodka, Blue Curaçao, Lime, Sciroppo Elettrico",
      story: "Un viaggio luminescente attraverso sapori sintetici",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Ribellione Rosa",
      price: "€20",
      ingredients: "Gin, Lampone, Rosa, Polvere Neon",
      story: "Dolce sfida in forma liquida",
      color: "from-pink-400 to-fuchsia-500",
    },
    {
      name: "Macchina Verde",
      price: "€22",
      ingredients: "Assenzio, Chartreuse, Lime, Estratto Luminoso",
      story: "Energia elettrica che scorre nelle tue vene",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Foschia Viola",
      price: "€19",
      ingredients: "Whiskey, Mora, Violetta, Fumo",
      story: "Perso nella mistica dell'underground",
      color: "from-purple-400 to-violet-500",
    },
    {
      name: "Effervescenza Cromata",
      price: "€21",
      ingredients: "Champagne, Foglia d'Argento, Agrumi, Scintilla",
      story: "Bollicine con ribellione metallica",
      color: "from-gray-400 to-slate-500",
    },
    {
      name: "Underground Dorato",
      price: "€25",
      ingredients: "Rum Invecchiato, Scaglie d'Oro, Miele, Fuoco",
      story: "Il gioiello della corona del lusso liquido",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20"
      id="menu"
    >
      <NeonGridBackground />

      {/* Top Fade Transition from Previous Section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>

      {/* Seamless background transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black"></div>

      {/* Animated neon grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,20,147,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)
        `,
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Chapter Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-sm tracking-widest uppercase text-green-400 font-light mb-4">
            Capitolo Due
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-tight mb-6">
            <span className="text-white">Il Menu</span>
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400"
              style={{
                textShadow: "0 0 30px rgba(0,255,0,0.5)",
              }}
            >
              Underground
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Sei capolavori liquidi che definiscono l'esperienza underground
          </p>
        </div>

        {/* Cocktail Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cocktails.map((cocktail, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <CocktailCard cocktail={cocktail} />
            </div>
          ))}
        </div>

        {/* Transition to next chapter */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() =>
              document
                .getElementById("reserve")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-10 py-4 bg-gradient-to-r from-pink-500/20 to-green-500/20 backdrop-blur-sm border border-pink-400/50 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:border-pink-400"
          >
            <span className="relative z-10 flex items-center gap-3">
              Inizia la Tua Leggenda
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/70 to-black z-20 pointer-events-none"></div>
    </section>
  );
};

export default UndergroundMenu;
