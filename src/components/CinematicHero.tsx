import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/bar-hero.mp4";
import smokeVideo from "../assets/smoke-diffusion.mp4";
import "./CinematicHero.css";

const CinematicHero = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const smokeVideoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setTimeout(() => setIsLoaded(true), 500);

    // Auto-play both videos
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(console.error);
    }
    if (smokeVideoRef.current) {
      smokeVideoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="cinematic-hero relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* LAYER 1: HERO VIDEO (z-10) */}
      {/* The absolute base layer - loops continuously. */}
      <div className="absolute inset-0 z-10">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* LAYER 2: SMOKE VIDEO OVERLAY (z-20) */}
      {/* Plays once. Black background made transparent via mix-blend-screen. */}
      <div className="absolute inset-0 z-20">
        <video
          ref={smokeVideoRef}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60"
          autoPlay
          muted
          playsInline
        >
          <source src={smokeVideo} type="video/mp4" />
        </video>
      </div>

      {/* LAYER 3: COLOR GRADING & LIGHTING (z-30) */}
      {/* These overlays affect the final look of everything underneath them. */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* The film grain acts like a filter on top of everything below */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply film-grain"></div>

        {/* Other color/lighting overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-green-900/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 cinematic-vignette"></div>
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
      {/* The highest layer. All text, navigation, and controls go here. */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div
            className={`text-lg sm:text-xl lg:text-2xl font-serif transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
            style={{
              color: "#ff1493",
              textShadow:
                "0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493",
            }}
          >
            Il Velvet Shaker
          </div>

          <div
            className={`hidden sm:flex space-x-4 lg:space-x-8 transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <a
              href="#story"
              className="text-white hover:text-green-400 transition-colors text-sm lg:text-lg font-medium"
              style={{ textShadow: "0 0 5px rgba(255,255,255,0.8)" }}
            >
              Storia
            </a>
            <a
              href="#menu"
              className="text-white hover:text-green-400 transition-colors text-sm lg:text-lg font-medium"
              style={{ textShadow: "0 0 5px rgba(255,255,255,0.8)" }}
            >
              Menu
            </a>
            <a
              href="#reserve"
              className="text-white hover:text-green-400 transition-colors text-sm lg:text-lg font-medium"
              style={{ textShadow: "0 0 5px rgba(255,255,255,0.8)" }}
            >
              Prenota
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button className="text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

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
