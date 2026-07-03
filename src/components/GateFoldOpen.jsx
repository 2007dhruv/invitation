import React, { useState } from 'react';
import './GateFoldOpen.css';

export default function GateFoldOpen({ onOpenComplete, language = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Sequence of animations
    // 1. Doors swing open (1s)
    // 2. Fade out the doors container entirely (0.5s)
    setTimeout(() => {
      setIsDone(true);
      onOpenComplete();
    }, 1500);
  };

  if (isDone) return null;

  return (
    <div className={`gate-fold-container ${isOpen ? 'open' : ''}`}>
      <div className="perspective-wrapper">
        
        {/* The Left Door */}
        <div className="door door-left">
          <div className="door-inner"></div>
        </div>

        {/* The Right Door */}
        <div className="door door-right">
          <div className="door-inner"></div>
        </div>

        {/* The Wax Seal in the Center */}
        <div className="wax-seal-container" onClick={handleOpen}>
          <div className="wax-seal pulse">
            <span className="tap-text">
              {language === 'gu' ? (
                <span className="gujarati-text" style={{ display: 'block', fontSize: '0.9rem', marginTop: '5px' }}>અહીં ટેપ કરો</span>
              ) : (
                "Tap to Open"
              )}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
