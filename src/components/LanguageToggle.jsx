import React from 'react';
import './LanguageToggle.css';

export default function LanguageToggle({ currentLanguage, onToggle }) {
  return (
    <div className="language-toggle-container">
      <button 
        className={`lang-toggle-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => onToggle('en')}
      >
        EN
      </button>
      <div className="lang-toggle-divider"></div>
      <button 
        className={`lang-toggle-btn gujarati-text ${currentLanguage === 'gu' ? 'active' : ''}`}
        onClick={() => onToggle('gu')}
      >
        ગુ
      </button>
    </div>
  );
}
