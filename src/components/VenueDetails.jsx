import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import './VenueDetails.css';

const VenueDetails = ({ language }) => {
  const sectionRef = useRef(null);

  // Match PhotoGallery: Parallax fade out when scrolling PAST the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  // Using a universal Google Maps link format.
  // This will open the Google Maps app if installed on the user's phone.
  const mapsUrl = "https://maps.app.goo.gl/fgV6ztSk8yamsC9t5";

  const content = {
    en: {
      title: "The Venue",
      name: "Shree Swaminarayan Gurukul",
      address: "Dhebar Rd, Bhakti Nagar, Rajkot ",
      time: "7:00 PM Onwards",
      buttonText: "Open in Maps",
      note: "Join us in celebrating this joyous occasion."
    },
    gu: {
      title: "સ્થળ",
      name: "શ્રી સ્વામિનારાયણ ગુરુકુળ",
      address: "ઢેબર રોડ, ભક્તિનગર, રાજકોટ",
      time: "સાંજે ૭:૦૦ કલાકથી",
      buttonText: "નકશો જુઓ",
      note: "આ આનંદના અવસર પર અમારી સાથે જોડાઓ."
    }
  };

  const t = content[language] || content.en;

  return (
    <section ref={sectionRef} className="venue-section section-padding">
      <motion.div
        className="container"
        style={{
          opacity: sectionOpacity,
          y: sectionY,
          filter: sectionBlur
        }}
      >
        <motion.div
          className="venue-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="venue-header text-center">
            <MapPin size={48} className="venue-icon animate-float" />
            <h2 className={language === 'gu' ? 'gujarati-text gold-gradient-text' : 'script-font gold-gradient-text'} style={{ fontSize: '3rem', marginBottom: '20px' }}>
              {t.title}
            </h2>
          </div>

          <div className="venue-details text-center">
            <h3 className={language === 'gu' ? 'gujarati-text' : ''} style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
              {t.name}
            </h3>
            <p className={language === 'gu' ? 'gujarati-text' : ''} style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '30px' }}>
              {t.address}
            </p>

            <div className="venue-datetime">
              <p className={language === 'gu' ? 'gujarati-text' : ''}>{t.time}</p>
            </div>

            <p className={`venue-note ${language === 'gu' ? 'gujarati-text' : ''}`}>
              {t.note}
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="directions-button"
            >
              <Navigation size={20} />
              <span className={language === 'gu' ? 'gujarati-text' : ''}>{t.buttonText}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VenueDetails;
