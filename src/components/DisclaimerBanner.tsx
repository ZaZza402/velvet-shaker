import { useState } from "react";
import "./DisclaimerBanner.css";

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="disclaimer-banner">
      <div className="disclaimer-content">
        <p className="disclaimer-text">
          🎨 <span className="disclaimer-highlight">Sito Demo</span> – Vuoi un
          design unico per il tuo locale?{" "}
          <a
            href="https://www.facebook.com/ax.m826"
            target="_blank"
            rel="noopener noreferrer"
            className="disclaimer-link"
          >
            Contattami su Facebook
          </a>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="disclaimer-close"
          aria-label="Chiudi banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
