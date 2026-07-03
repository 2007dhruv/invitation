import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CountdownTimer.css';

export default function CountdownTimer({ targetDate = new Date('2026-12-25T00:00:00'), language = 'en' }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Multilingual labels and text
  const labels = {
    en: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      title: "The Countdown Begins",
      footer: "We look forward to celebrating with you!"
    },
    gu: {
      days: "દિવસ",
      hours: "કલાક",
      minutes: "મિનિટ",
      seconds: "સેકન્ડ",
      title: "સમય શરૂ",
      footer: "અમે તમારી રાહ જોઇ રહ્યા છીએ!"
    }
  };

  const t = labels[language] || labels.en;

  const timerComponents = [];
  const intervals = ['days', 'hours', 'minutes', 'seconds'];

  intervals.forEach((interval) => {
    if (timeLeft[interval] !== undefined) {
      timerComponents.push(
        <motion.div 
          key={interval} 
          className="time-block"
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
          }}
        >
          <span className="time-value">{timeLeft[interval].toString().padStart(2, '0')}</span>
          <span className={language === 'gu' ? 'gujarati-text time-label' : 'time-label'}>{t[interval]}</span>
        </motion.div>
      );
    }
  });

  return (
    <section ref={sectionRef} className="countdown-section section-padding">
      <motion.div 
        className="container text-center"
        style={{
          opacity: sectionOpacity,
          y: sectionY,
          filter: sectionBlur
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15 } 
            },
            hidden: { opacity: 0 }
          }}
          className="countdown-content"
        >
          <motion.h2 
            className={language === 'gu' ? 'gujarati-text' : 'script-font'} 
            style={{ fontSize: language === 'gu' ? '3rem' : '3.5rem', marginBottom: '50px', color: 'var(--text-primary)' }}
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t.title}
          </motion.h2>
          
          <div className="countdown-container">
            {timerComponents.length ? timerComponents : <span className="script-font" style={{fontSize: '2.5rem', color: 'var(--text-primary)'}}>It's time!</span>}
          </div>

          <motion.div 
            className="finale-footer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }
            }}
          >
            <p className={language === 'gu' ? 'gujarati-text' : 'script-font'} style={{ fontSize: language === 'gu' ? '2.2rem' : '2.8rem', color: 'var(--text-primary)' }}>
              {t.footer}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
