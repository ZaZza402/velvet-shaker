import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import heroImage from "../assets/bar-hero-img.jpg";
import heroVideoMobile from "../assets/hero-clip-mobile.mp4";
import "./CinematicHero.css";

const CinematicHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  // Trigger entrance animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Set showContent to true immediately on desktop
  useEffect(() => {
    if (!isMobile) {
      setShowContent(true);
    }
  }, [isMobile]);

  // Handle video end on mobile ONLY
  useEffect(() => {
    if (!isMobile || !videoRef.current) return;

    const video = videoRef.current;

    const handleVideoEnd = () => {
      setVideoEnded(true);
      // Wait for blur animation, then show content
      setTimeout(() => setShowContent(true), 800);
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [isMobile]);

  // Container animation for staggered children
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Smooth title animation with elegant fade and rise
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.92,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.8,
        ease: [0.25, 0.1, 0.25, 1] as const, // Smooth, elegant cubic-bezier
        opacity: { duration: 1.6, ease: "easeOut" as const },
        scale: { duration: 1.8, ease: [0.34, 1.56, 0.64, 1] as const }, // Slight overshoot for elegance
        filter: { duration: 1.2, ease: "easeOut" as const },
      },
    },
  };

  // Smooth subtitle animation - softer and slower
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 25,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.6,
        ease: [0.25, 0.1, 0.25, 1] as const, // Matching elegant curve
        opacity: { duration: 1.8, ease: "easeOut" as const },
        filter: { duration: 1.4, ease: "easeOut" as const },
      },
    },
  };

  return (
    <div className="cinematic-hero relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* MOBILE: Vertical Video Background */}
      {isMobile && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src={heroVideoMobile}
            className="mobile-hero-video w-full h-full object-cover"
            muted
            playsInline
            autoPlay
          />
          {/* Cinematic Vignette Overlay - Always visible */}
          <div className="mobile-vignette absolute inset-0 pointer-events-none" />
          
          {/* Blur Overlay - Appears after video ends */}
          {videoEnded && (
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      )}

      {/* DESKTOP: Static Image Background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay filter for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-40 w-full h-full px-4 sm:px-6 flex items-center justify-center">
        {/* Title and Subtitle - Show only when showContent is true */}
        {showContent && (
          <motion.div 
            className="flex flex-col items-center justify-center text-center space-y-8"
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title with Animated Neon RGB Effect */}
            <motion.h1
              className="neon-title relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-wider"
              style={{
                fontFamily: '"Playfair Display", serif',
              }}
              variants={titleVariants}
            >
              Il Velvet Shaker
            </motion.h1>

            {/* Subtitle with Depth Effect */}
            <motion.p
              className="font-georgia text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 tracking-wide max-w-3xl italic relative"
              style={{ 
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4)",
                filter: "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.1))"
              }}
              variants={subtitleVariants}
            >
              Regalati un sito che raconta una storia
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Bottom Fade Transition Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"
        style={{ zIndex: 100 }}
      ></div>

      {/* UI ELEMENTS (z-50) */}

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

      {/* CSS Styles for Neon RGB Title and Animations */}
      <style>{`
        @keyframes rgbShift {
          0% {
            text-shadow: 
              0 0 10px rgba(255, 50, 80, 0.95),
              0 0 20px rgba(255, 50, 80, 0.75),
              0 0 30px rgba(255, 50, 80, 0.55),
              0 0 40px rgba(255, 50, 80, 0.35),
              2px 2px 4px rgba(0, 0, 0, 0.9),
              4px 4px 8px rgba(0, 0, 0, 0.7);
            color: #fff;
          }
          25% {
            text-shadow: 
              0 0 10px rgba(255, 110, 60, 0.95),
              0 0 20px rgba(255, 110, 60, 0.75),
              0 0 30px rgba(255, 110, 60, 0.55),
              0 0 40px rgba(255, 110, 60, 0.35),
              2px 2px 4px rgba(0, 0, 0, 0.9),
              4px 4px 8px rgba(0, 0, 0, 0.7);
            color: #fff;
          }
          50% {
            text-shadow: 
              0 0 10px rgba(220, 38, 127, 0.95),
              0 0 20px rgba(220, 38, 127, 0.75),
              0 0 30px rgba(220, 38, 127, 0.55),
              0 0 40px rgba(220, 38, 127, 0.35),
              2px 2px 4px rgba(0, 0, 0, 0.9),
              4px 4px 8px rgba(0, 0, 0, 0.7);
            color: #fff;
          }
          75% {
            text-shadow: 
              0 0 10px rgba(255, 75, 100, 0.95),
              0 0 20px rgba(255, 75, 100, 0.75),
              0 0 30px rgba(255, 75, 100, 0.55),
              0 0 40px rgba(255, 75, 100, 0.35),
              2px 2px 4px rgba(0, 0, 0, 0.9),
              4px 4px 8px rgba(0, 0, 0, 0.7);
            color: #fff;
          }
          100% {
            text-shadow: 
              0 0 10px rgba(255, 50, 80, 0.95),
              0 0 20px rgba(255, 50, 80, 0.75),
              0 0 30px rgba(255, 50, 80, 0.55),
              0 0 40px rgba(255, 50, 80, 0.35),
              2px 2px 4px rgba(0, 0, 0, 0.9),
              4px 4px 8px rgba(0, 0, 0, 0.7);
            color: #fff;
          }
        }

        .neon-title {
          animation: rgbShift 8s ease-in-out infinite;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};

export default CinematicHero;
