import { useEffect, useRef, useState } from "react";
import NeonGridBackground from "./NeonGridBackground";
import "./LegendBegins.css";

const LegendBegins = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    requests: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "La tua leggenda inizia! Ti contatteremo entro 24 ore per confermare la tua prenotazione."
    );
    console.log("Form data:", formData);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20"
      id="reserve"
    >
      <NeonGridBackground />

      {/* Top Fade Transition from Previous Section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-green-400/5 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Chapter Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-sm tracking-widest uppercase text-purple-400 font-light mb-4">
            Capitolo Tre
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-tight mb-6">
            <span className="text-white">La Tua Leggenda</span>
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-green-400"
              style={{
                textShadow: "0 0 30px rgba(147,51,234,0.5)",
              }}
            >
              Inizia
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entra nell'underground. Prenota il tuo posto al bar dove nascono le
            storie.
          </p>
        </div>

        {/* Reservation Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div
              className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-2">
                <label className="block text-pink-400 font-medium text-sm tracking-wide uppercase">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-pink-400 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                  placeholder="Inserisci il tuo nome"
                  style={{
                    boxShadow: "0 0 0 0 rgba(255,20,147,0.4)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 20px rgba(255,20,147,0.2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.boxShadow = "0 0 0 0 rgba(255,20,147,0.4)")
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="block text-green-400 font-medium text-sm tracking-wide uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-green-400 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                  placeholder="tua@email.com"
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 20px rgba(0,255,0,0.2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.boxShadow = "0 0 0 0 rgba(0,255,0,0.4)")
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <label className="block text-purple-400 font-medium text-sm tracking-wide uppercase mb-2">
                Telefono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-purple-400 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                placeholder="(+39) 123-456-7890"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 20px rgba(147,51,234,0.2)")
                }
                onBlur={(e) =>
                  (e.target.style.boxShadow = "0 0 0 0 rgba(147,51,234,0.4)")
                }
              />
            </div>

            {/* Reservation Details */}
            <div
              className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-2">
                <label className="block text-cyan-400 font-medium text-sm tracking-wide uppercase">
                  Data *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-cyan-400 rounded-xl px-4 py-4 text-white focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-orange-400 font-medium text-sm tracking-wide uppercase">
                  Orario *
                </label>
                <select
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-orange-400 rounded-xl px-4 py-4 text-white focus:outline-none transition-all duration-300"
                >
                  <option value="">Seleziona orario</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-yellow-400 font-medium text-sm tracking-wide uppercase">
                  Ospiti *
                </label>
                <select
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-yellow-400 rounded-xl px-4 py-4 text-white focus:outline-none transition-all duration-300"
                >
                  <option value="">Numero di persone</option>
                  <option value="1">1 Ospite</option>
                  <option value="2">2 Ospiti</option>
                  <option value="3">3 Ospiti</option>
                  <option value="4">4 Ospiti</option>
                  <option value="5">5 Ospiti</option>
                  <option value="6+">6+ Ospiti</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <label className="block text-pink-400 font-medium text-sm tracking-wide uppercase mb-2">
                Richieste Speciali
              </label>
              <textarea
                name="requests"
                rows={4}
                value={formData.requests}
                onChange={handleChange}
                className="w-full bg-black/50 backdrop-blur-sm border border-gray-700/50 focus:border-pink-400 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Occasioni speciali, restrizioni alimentari, preferenze per i posti..."
              />
            </div>

            {/* Submit Button */}
            <div
              className={`text-center pt-8 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                type="submit"
                className="group relative px-12 py-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-green-500/20 backdrop-blur-sm border-2 border-pink-400/50 rounded-full text-white font-bold text-xl transition-all duration-300 hover:scale-105 hover:border-pink-400 overflow-hidden"
                style={{
                  textShadow: "0 0 20px rgba(255,20,147,0.5)",
                }}
              >
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Entra nell'Underground
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Fade Transition to Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/70 to-black z-20 pointer-events-none"></div>
    </section>
  );
};

export default LegendBegins;
