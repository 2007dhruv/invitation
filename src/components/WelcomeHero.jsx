import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ganeshaImg from '../assets/ganesha.png';
import './WelcomeHero.css';

export default function WelcomeHero({ coupleNames = "Meet & Sargam", tagline = "Together Forever", language = 'en' }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="welcome-hero">
      {/* This container handles the scroll away parallax effect */}
      <div 
        className="parallax-container"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          opacity: Math.max(1 - scrollY / 400, 0)
        }}
      >
        {/* This container handles the initial entrance effect */}
        <div className="hero-content elegant-entrance">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="ganesha-wrapper"
          >
            <img src={ganeshaImg} alt="Lord Ganesha" className="ganesha-img" />
          </motion.div>

          {language === 'gu' ? (
            <h2 className="gujarati-text" style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '-10px' }}>સગાઈ સમારંભ</h2>
          ) : (
            <h3 className="tagline" style={{ fontSize: '1.2rem' }}>Engagement Ceremony</h3>
          )}
          
          <h1 className="couple-names gold-gradient-text script-font" style={{ marginTop: '20px' }}>{coupleNames}</h1>
          
          <div style={{ marginTop: '15px' }}>
            {language === 'gu' ? (
              <h3 className="gujarati-text" style={{ fontSize: '1.5rem', marginBottom: '5px' }}>સાથે હંમેશા</h3>
            ) : (
              <h3 className="tagline" style={{ fontSize: '1rem', letterSpacing: '2px' }}>{tagline}</h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
