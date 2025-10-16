import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import CocktailCard from "./CocktailCard";
import NeonGridBackground from "./NeonGridBackground";
import "./UndergroundMenu.css";

const UndergroundMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Hide the hint after 5 seconds when section comes into view
          setTimeout(() => {
            setShowHint(false);
          }, 5000);
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

  // L'Ora Dorata special cocktails
  const goldenHourCocktails = [
    {
      name: "Aurelia",
      price: "€12",
      description: "Gin infuso allo zafferano, miele, limone, polvere d'oro.",
      pairing: "Accompagnato da stuzzichini gourmet.",
    },
    {
      name: "Vespro",
      price: "€12",
      description:
        "Un Negroni rivisitato con liquore all'arancia sanguigna e bitter al cioccolato.",
      pairing: "Accompagnato da stuzzichini gourmet.",
    },
  ];

  // Framer Motion variants for Golden Hour section
  const goldenHourRef = useRef<HTMLDivElement>(null);
  const isGoldenHourInView = useInView(goldenHourRef, {
    once: true,
    amount: 0.3,
  });

  const goldenHourVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const goldenCardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

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
        <div className="relative">
          {/* Interactive Hint Tooltip */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="absolute top-[-4rem] left-4 md:left-8 z-20 p-3 rounded-lg border border-cyan-400/50 bg-black/50 backdrop-blur-sm shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  className="text-sm text-cyan-400"
                  style={{ textShadow: "0 0 8px rgba(0, 255, 255, 0.5)" }}
                >
                  {isMobile
                    ? "Tocca le carte."
                    : "Muovi il cursore sulle carte."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            onMouseEnter={() => setShowHint(false)}
            onTouchStart={() => setShowHint(false)}
          >
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
        </div>

        {/* L'Ora Dorata Section */}
        <motion.div
          ref={goldenHourRef}
          initial="hidden"
          animate={isGoldenHourInView ? "visible" : "hidden"}
          variants={goldenHourVariants}
          className="mt-20 pt-12 border-t border-primary/20"
        >
          {/* Golden Hour Header */}
          <div className="text-center mb-12">
            <h3 className="text-5xl lg:text-6xl font-serif text-primary mb-4">
              L'Ora Dorata
            </h3>
            <p className="text-lg text-gray-300 mb-2">
              Dove il crepuscolo incontra l'alchimia.
            </p>
            <p className="text-base text-primary/80 font-light tracking-wide">
              Ogni Mercoledì e Giovedì, dalle 18:00 alle 20:00.
            </p>
          </div>

          {/* Golden Hour Cocktails Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {goldenHourCocktails.map((cocktail, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={goldenCardVariants}
                initial="hidden"
                animate={isGoldenHourInView ? "visible" : "hidden"}
                className="group relative p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm border border-primary/30 rounded-lg transition-all duration-500 hover:border-primary hover:shadow-glow"
              >
                {/* Golden accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-tr-lg" />

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Name and Price */}
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-3xl font-serif text-primary group-hover:text-primary-light transition-colors duration-300">
                      {cocktail.name}
                    </h4>
                    <span className="text-2xl font-light text-primary/90">
                      {cocktail.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-4 text-base">
                    {cocktail.description}
                  </p>

                  {/* Pairing */}
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-sm text-primary/70 italic">
                      {cocktail.pairing}
                    </p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>

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
