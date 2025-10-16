import { useRef, useEffect } from "react";
import cocktailVideo from "../assets/spinning-cocktail.mp4";
import "./CinematicStory.css";
// Import Framer Motion hooks and components
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// Define animation variants for declarative animations
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Sequential delay between child animations
      delayChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for easeOut
    },
  },
};

const paragraphVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for easeOut
    },
  },
};

const CinematicStory = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Use the useInView hook to detect when video enters viewport
  const isVideoInView = useInView(videoRef, { once: true, amount: 0.3 });

  // Continuous looping animation variants for highlighted text
  const liquidVariant: Variants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%"],
      transition: {
        delay: 2.5,
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariant: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      textShadow: [
        "0 0 8px rgba(0,255,0,0.4)",
        "0 0 16px rgba(0,255,0,0.7)",
        "0 0 8px rgba(0,255,0,0.4)",
      ],
      transition: {
        delay: 2.5,
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  const transcendentVariant: Variants = {
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        delay: 2.5,
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  };

  // Play the video when it comes into view
  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [isVideoInView]);

  return (
    <section
      className="cinematic-story relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center overflow-hidden"
      id="story"
    >
      {/* Top Fade Transition from Previous Section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-900 via-gray-900/70 to-transparent z-10 pointer-events-none"></div>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
        >
          <source src={cocktailVideo} type="video/mp4" />
        </video>

        {/* Professional color grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-screen py-20">
          {/* Left Side - Story Text */}
          <motion.div
            className="space-y-8 lg:space-y-12"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Chapter Title */}
            <div className="space-y-4">
              <motion.div
                variants={itemVariant}
                className="text-sm tracking-widest uppercase text-pink-400 font-light"
              >
                Capitolo Uno
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                <motion.span
                  variants={itemVariant}
                  className="block text-white"
                >
                  L'Arte della
                </motion.span>
                <motion.span
                  variants={itemVariant}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-green-400"
                  style={{
                    textShadow: "0 0 30px rgba(255,20,147,0.5)",
                  }}
                >
                  Poesia Liquida
                </motion.span>
              </h2>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-gray-300 text-lg lg:text-xl leading-relaxed">
              <motion.p variants={paragraphVariant}>
                Nelle profondità dell'underground cittadino, dove il neon
                sanguina attraverso mattoni e malta, abbiamo scoperto qualcosa
                di straordinario. Non solo un bar, ma un santuario dove{" "}
                <motion.span
                  className="text-pink-400 font-medium"
                  variants={liquidVariant}
                  animate="animate"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #f472b6, #ec4899, #db2777, #ec4899, #f472b6)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  l'arte liquida
                </motion.span>{" "}
                trascende l'ordinario.
              </motion.p>

              <motion.p variants={paragraphVariant}>
                Ogni cocktail nasce come una visione—un'armonia di sapori che
                racconta una storia più antica del tempo stesso. I nostri
                mixologist non versano semplicemente drink; loro{" "}
                <motion.span
                  className="text-green-400 font-medium"
                  variants={pulseVariant}
                  animate="animate"
                  style={{
                    display: "inline-block",
                  }}
                >
                  coreografano esperienze
                </motion.span>{" "}
                che risvegliano sensi dormienti.
              </motion.p>

              <motion.p variants={paragraphVariant}>
                Osserva il rituale dispiegarsi. La misura precisa. Il mescolare
                deliberato. Il momento in cui elementi separati diventano
                qualcosa di{" "}
                <motion.span
                  className="text-purple-400 font-medium"
                  variants={transcendentVariant}
                  animate="animate"
                  style={{
                    display: "inline-block",
                  }}
                >
                  trascendente
                </motion.span>
                . Qui è dove inizia la tua storia.
              </motion.p>
            </div>

            {/* Call to Action */}
            <motion.div variants={itemVariant} className="pt-8">
              <button
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/50 rounded-full text-pink-400 font-medium transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:bg-pink-500/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Esplora la Nostra Arte
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
            </motion.div>
          </motion.div>

          {/* Right Side - Video Focus Area */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Video Frame Enhancement */}
            <div className="relative">
              {/* Subtle neon frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-green-500/20 rounded-2xl blur-xl"></div>

              {/* Content overlay on video area */}
              <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-serif text-white">
                    Ogni Goccia Conta
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    La precisione incontra la passione in ogni versata. Dietro
                    il vetro, assistere alla meditazione della mixology.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-pink-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">
                        15+
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Anni di Esperienza
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        50+
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Cocktail Signature
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">∞</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Storie Create
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/50 to-black z-20 pointer-events-none"></div>
    </section>
  );
};

export default CinematicStory;
