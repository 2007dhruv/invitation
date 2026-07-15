import React, { useState, useEffect, useRef } from 'react';
import './EnvelopeReveal.css';

export default function EnvelopeReveal({ date = "October 20, 2026", language = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollData, setScrollData] = useState({ y: 0, opacity: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0 (just entering bottom) to 1 (leaving top)
      const scrollProgress = 1 - (rect.bottom / (windowHeight + rect.height));

      let y = 0;
      let opacity = 1;

      if (scrollProgress < 0.5) {
        // Entering from bottom (0 to 0.5)
        const normalized = Math.max(0, scrollProgress * 2);
        y = -150 * (1 - normalized); // Starts higher, moves down to 0
        opacity = normalized;
      } else {
        // Leaving towards top (0.5 to 1)
        const normalized = Math.min(1, (scrollProgress - 0.5) * 2);
        y = 200 * normalized; // Starts at 0, moves down
        opacity = 1 - normalized;
      }

      setScrollData({ y, opacity });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="envelope-section section-padding">
      <div
        className="container text-center"
        style={{
          transform: `translateY(${scrollData.y}px)`,
          opacity: scrollData.opacity,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}
      >
        <h2 className="section-title" style={{ marginBottom: '40px' }}>
          {language === 'gu' ? (
            <span className="gujarati-text" style={{ display: 'block', fontSize: '1.5rem', marginBottom: '5px' }}>અમારી સગાઈ</span>
          ) : (
            "Engagement Ceremony"
          )}
        </h2>

        <div className="envelope-wrapper">
          <div
            className={`envelope ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(true)}
          >
            <div className="envelope-front"></div>
            <div className="envelope-flap"></div>

            <div className="envelope-card">
              {language === 'gu' ? (
                <div className="revealed-text gujarati-text" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>સગાઈ સમારંભ</div>
              ) : (
                <div className="revealed-text" style={{ fontSize: '1.1rem', letterSpacing: '2px', color: 'var(--text-primary)', marginBottom: '15px' }}>Engagement Ceremony</div>
              )}
              <h3 className="revealed-date">{date}</h3>
            </div>

            <div className="envelope-back">
              <div className="envelope-wax-seal" onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}></div>
            </div>
          </div>

          {!isOpen && (
            <p className="instruction-text">Tap the seal to open</p>
          )}
        </div>
      </div>
    </section>
  );
}
