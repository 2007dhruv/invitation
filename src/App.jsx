import React, { useState } from 'react';
import WelcomeHero from './components/WelcomeHero';
import CountdownTimer from './components/CountdownTimer';
import EnvelopeReveal from './components/EnvelopeReveal';
import PhotoGallery from './components/PhotoGallery';
import VenueDetails from './components/VenueDetails';
import GateFoldOpen from './components/GateFoldOpen';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [language, setLanguage] = useState('en'); // default to 'en'

  return (
    <>
      <LanguageToggle currentLanguage={language} onToggle={setLanguage} />

      <GateFoldOpen language={language} onOpenComplete={() => setShowInvitation(true)} />

      <div className={`app-container ${showInvitation ? 'animate-fade-in' : ''}`} style={{ opacity: showInvitation ? 1 : 0, transition: 'opacity 1s ease' }}>
        <WelcomeHero language={language} />
        <EnvelopeReveal language={language} date="August 25, 2026" />
        <PhotoGallery language={language} />
        <VenueDetails language={language} />
        <CountdownTimer targetDate={new Date('2026-08-25T00:00:00')} language={language} />
      </div>
    </>
  );
}

export default App;
