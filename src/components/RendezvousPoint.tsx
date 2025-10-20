import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const RendezvousPoint = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Framer Motion variants for smooth entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-20 lg:py-32"
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,20,147,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div
            className="tracking-widest uppercase text-primary font-light mb-4 font-handwriting text-base"
            style={{
              lineHeight: "2",
              letterSpacing: "0.1em",
            }}
          >
            Il Punto d'Incontro
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4">
            Dove Trovarci
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-georgia">
            Nel cuore pulsante di Roma, dove l'ombra incontra la luce
          </p>
        </motion.div>

        {/* Three-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left Column: Address & Hours */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 text-center md:text-left"
          >
            <div>
              <h4 className="text-2xl font-serif text-pink-400 mb-4">
                Indirizzo & Orari
              </h4>
              <div className="space-y-3">
                <p className="text-gray-400 leading-relaxed font-georgia">
                  Via Panisperna, 101
                  <br />
                  00184 Roma RM
                  <br />
                  Quartiere Monti
                </p>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm font-georgia">
                    <span className="text-primary font-medium">Lun - Gio:</span>{" "}
                    18:00 - 02:00
                  </p>
                  <p className="text-gray-400 text-sm font-georgia">
                    <span className="text-primary font-medium">Ven - Sab:</span>{" "}
                    18:00 - 04:00
                  </p>
                  <p className="text-gray-400 text-sm font-georgia">
                    <span className="text-primary font-medium">Domenica:</span>{" "}
                    Chiuso
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Dark Mode Google Maps */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="relative aspect-video border border-gray-700 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {/* Dark-themed Google Maps Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.833501170243!2d12.49134951540916!3d41.89553197922089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b3531b2c45%3A0x242421334526719f!2sVia%20Panisperna%2C%20101%2C%2000184%20Roma%20RM!5e0!3m2!1sen!2sit!4v1668602752103!5m2!1sen!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Velvet Shaker Location"
                className="invert hue-rotate-180 contrast-95 brightness-90"
              />

              {/* Subtle overlay for additional depth */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Map caption */}
            <p className="text-center text-xs text-gray-500 mt-3 italic">
              Quartiere Monti - Centro Storico
            </p>
          </motion.div>

          {/* Right Column: Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 text-center md:text-right"
          >
            <div>
              <h4 className="text-2xl font-serif text-green-400 mb-4">
                Contatti
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Telefono</p>
                  <a
                    href="tel:+390612345678"
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg"
                  >
                    +39 06 1234 5678
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <a
                    href="mailto:info@velvetshaker.it"
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    info@velvetshaker.it
                  </a>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-500 text-sm mb-2">Social</p>
                  <div className="flex gap-4 justify-center md:justify-end">
                    <a
                      href="https://www.facebook.com/ax.m826"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/ax.m826"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Optional: Decorative divider */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500 text-sm">
            <span className="text-primary">⚡</span> Accesso riservato ai
            maggiori di 18 anni <span className="text-primary">⚡</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RendezvousPoint;
