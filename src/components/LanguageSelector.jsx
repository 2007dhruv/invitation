import React from 'react';
import { motion } from 'framer-motion';
import './LanguageSelector.css';

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <div className="language-selector-container">
      <motion.div 
        className="language-selector-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="language-selector-title gold-gradient-text script-font" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          Select Language
        </h1>
        
        <div className="language-buttons">
          <button 
            className="lang-btn" 
            onClick={() => onSelectLanguage('en')}
          >
            English
          </button>
          
          <button 
            className="lang-btn gujarati" 
            onClick={() => onSelectLanguage('gu')}
          >
            ગુજરાતી
          </button>
        </div>
      </motion.div>
    </div>
  );
}
