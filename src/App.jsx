import React, { useState } from 'react';
import WelcomeHero from './components/WelcomeHero';
import CountdownTimer from './components/CountdownTimer';
import EnvelopeReveal from './components/EnvelopeReveal';
import PhotoGallery from './components/PhotoGallery';
import VenueDetails from './components/VenueDetails';
import GateFoldOpen from './components/GateFoldOpen';
import LanguageToggle from './components/LanguageToggle';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [language, setLanguage] = useState('en'); // default to 'en'
  const [audioShouldPlay, setAudioShouldPlay] = useState(false);

  return (
    <>
      <LanguageToggle currentLanguage={language} onToggle={setLanguage} />

      <GateFoldOpen language={language} onOpenComplete={() => { setShowInvitation(true); setAudioShouldPlay(true); }} />

      <div className={`app-container ${showInvitation ? 'animate-fade-in' : ''}`} style={{ opacity: showInvitation ? 1 : 0, transition: 'opacity 1s ease' }}>
        <WelcomeHero language={language} />
        <EnvelopeReveal language={language} date="October 20, 2026" />
        <PhotoGallery language={language} />
        <VenueDetails language={language} />
        <CountdownTimer targetDate={new Date('2026-10-20T00:00:00')} language={language} />
        <AudioPlayer language={language} src="/song.mp3" shouldPlay={audioShouldPlay} />
      </div>
    </>
  );
}

export default App;
