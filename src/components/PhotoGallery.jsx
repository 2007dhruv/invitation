import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import './PhotoGallery.css';

export default function PhotoGallery({ language = 'en' }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const photos = [
    { id: 1, src: img1, caption: language === 'gu' ? "અમારો પહેલો અધ્યાય" : "Our First Chapter" },
    // { id: 2, src: img2, caption: language === 'gu' ? "હંમેશા સાથે" : "Together Always" },
    { id: 3, src: img3, caption: language === 'gu' ? "એક પ્રેમ કથા" : "A Love Story" },
    { id: 4, src: img4, caption: language === 'gu' ? "કાયમ માટે" : "Forever & Always" },
    { id: 5, src: img5, caption: language === 'gu' ? "ભવિષ્યમાં" : "Into the Future" },
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up scroll tracking for the parallax fade/blur effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"] // Track when the top of the section hits the top of viewport until bottom leaves
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <section ref={sectionRef} className="gallery-section section-padding">
      <motion.div
        className="container"
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: isMobile ? '0' : '0 20px',
          opacity: sectionOpacity,
          y: sectionY,
          filter: sectionBlur
        }}
      >

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
          style={{ padding: isMobile ? '0 20px' : '0' }}
        >
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>
            {language === 'gu' ? (
              <span className="gujarati-text" style={{ fontSize: '2.5rem', display: 'block', color: 'var(--accent-gold)' }}>અમારી સફર</span>
            ) : (
              "Our Story"
            )}
          </h2>
          <p className="script-font gallery-subtitle" style={{ marginTop: '5px' }}>
            {language === 'gu' ? (
              <span className="gujarati-text" style={{ fontSize: '1.2rem' }}>અમારી સુંદર યાદો...</span>
            ) : (
              "Beautiful moments we've shared..."
            )}
          </p>
        </motion.div>

        {/* Desktop: Framer Motion Staggered Masonry Grid */}
        {!isMobile && (
          <motion.div
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {photos.map((card, index) => (
              <motion.div
                key={card.id}
                className={`gallery-item item-${index + 1}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 40 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 60, damping: 15 }
                  }
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={card.src} alt={card.caption} loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile: Crazy Physics Swipe Stack */}
        {isMobile && (
          <motion.div
            className="tinder-stack-wrapper"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tinder-stack-container">
              {/* The End State (Shown when all cards are swiped) */}
              <div className="tinder-empty-state">
                <p className="script-font">To be continued...</p>
                {activeIndex === photos.length && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="reset-stack-btn"
                    onClick={() => setActiveIndex(0)}
                  >
                    View Again
                  </motion.button>
                )}
              </div>

              {/* The Physics Cards */}
              <AnimatePresence>
                {[...photos].map((card, index) => {
                  if (index < activeIndex) return null; // Card has been swiped away

                  const isTop = index === activeIndex;
                  const indexInStack = index - activeIndex;

                  return (
                    <SwipeableCard
                      key={card.id}
                      card={card}
                      isTop={isTop}
                      indexInStack={indexInStack}
                      totalCards={photos.length}
                      onSwipe={() => setActiveIndex(prev => prev + 1)}
                    />
                  );
                }).reverse()}
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="carousel-pagination">
              {photos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'viewed' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

function SwipeableCard({ card, isTop, indexInStack, onSwipe }) {
  const x = useMotionValue(0);
  const [exitX, setExitX] = useState(-400); // Default exit direction

  // As user drags left/right, the card naturally tilts
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  // As user drags far left/right, the card fades out slightly to indicate it will be removed
  const opacity = useTransform(x, [-250, -100, 0, 100, 250], [0, 1, 1, 1, 0]);

  // Math for the depth effect (cards waiting below are smaller and lower)
  const scale = isTop ? 1 : 1 - (indexInStack * 0.06);
  const yOffset = isTop ? 0 : indexInStack * 20;

  const handleDragEnd = (event, info) => {
    // If swiped left or right more than 100px, trigger swipe!
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      // Set the exit direction state based on which way the user dragged
      setExitX(info.offset.x > 0 ? 400 : -400);
      onSwipe();
    }
  };

  return (
    <motion.div
      className="tinder-card"
      style={{
        x: isTop ? x : 0,
        y: yOffset,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale,
        zIndex: 100 - indexInStack // Ensure top card is always front
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}

      // Entrance animation for when the stack resets or loads
      initial={{ scale: 0.5, opacity: 0, y: 100 }}
      animate={{ scale, opacity: 1, y: yOffset }}

      // The exit animation uses the state we set when they let go
      exit={{
        x: exitX,
        opacity: 0,
        rotate: exitX > 0 ? 45 : -45,
        transition: { duration: 0.3, ease: "easeOut" }
      }}

      // Spring physics for all movements (snapping back, popping up to top position)
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <div className="carousel-polaroid">
        <div className="carousel-img-container">
          <img src={card.src} alt={card.caption} draggable="false" />
        </div>
        <div className="carousel-caption script-font">
          {card.caption}
        </div>
      </div>
    </motion.div>
  );
}
