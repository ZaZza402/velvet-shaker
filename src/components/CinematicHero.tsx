import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import heroVideoMobile from "../assets/bar-hero.mp4";
import heroVideoDesktop from "../assets/bar-hero-desktop.mp4";
import "./CinematicHero.css";

const CinematicHero = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setTimeout(() => setIsLoaded(true), 500);

    // Auto-play video
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="cinematic-hero relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* LAYER 1: HERO VIDEO (z-10) */}
      {/* The absolute base layer - loops continuously. */}
      <div
        className={`absolute inset-0 z-10 ${
          isMobile ? "mobile-video-wrapper" : ""
        }`}
      >
        <video
          ref={heroVideoRef}
          className={`w-full h-full ${
            isMobile ? "mobile-video-zoom" : "object-cover"
          }`}
          autoPlay
          muted
          loop={!isMobile}
          playsInline
        >
          <source
            src={isMobile ? heroVideoMobile : heroVideoDesktop}
            type="video/mp4"
          />
        </video>
      </div>

      {/* LAYER 3: COLOR GRADING & LIGHTING (z-30) */}
      {/* These overlays affect the final look of everything underneath them. */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Other color/lighting overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-green-900/10 mix-blend-overlay"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-radial from-pink-500/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-radial from-green-400/8 to-transparent rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* LAYER 4: TRANSITION FADE (z-40) */}
      {/* Sits over the scene but below the UI. Ensure it cannot be clicked or scrolled on. */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-40 pointer-events-none"></div>

      {/* LAYER 5: UI ELEMENTS (z-50) */}

      {/* DESKTOP NAVIGATION - Renders only on screens >= 768px wide */}
      <nav className="hidden md:flex absolute top-0 left-0 right-0 z-50 p-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div
            className="text-2xl font-serif"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#ff1493",
              textShadow: "0 0 10px #ff1493",
            }}
          >
            Il Velvet Shaker
          </div>
          <div className="flex space-x-8">
            <a
              href="#story"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#story")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Storia
            </a>
            <a
              href="#gallery"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </a>
            <a
              href="#menu"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#menu")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Menu
            </a>
            <a
              href="#location"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#location")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Dove Trovarci
            </a>
            <a
              href="#reserve"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#reserve")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Prenota
            </a>
          </div>
        </div>
      </nav>

      {/* Animated Subtitle */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-40 left-1/2 -translate-x-1/2 z-50 text-white/70 text-lg font-sans tracking-wider text-center"
          style={{ textShadow: "0 0 12px rgba(255, 20, 147, 0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Esplora il sito come una storia
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 delay-1800 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className="flex flex-col items-center"
          style={{ color: "#ff1493" }}
        >
          <span
            className="text-xs sm:text-sm mb-2 tracking-wide"
            style={{ textShadow: "0 0 10px #ff1493" }}
          >
            Scorri per esplorare
          </span>
          <div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: "#ff1493", boxShadow: "0 0 10px #ff1493" }}
          >
            <div
              className="w-1 h-2 sm:h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: "#ff1493" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicHero;
