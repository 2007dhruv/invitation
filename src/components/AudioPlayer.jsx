import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ language = 'en', src = '/song.mp3', shouldPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const START_TIME = 20; // ⏩ Skip first 20 seconds

  // ✅ LOG 1: Component mounted
  useEffect(() => {
    console.log('%c🎵 AudioPlayer mounted', 'color: #a855f7; font-weight: bold; font-size: 14px');
    console.log('📂 Audio src:', src);

    const audio = audioRef.current;
    if (!audio) return;

    // ✅ LOG 2: When browser starts loading the file
    audio.addEventListener('loadstart', () => {
      console.log('%c📡 Audio: Loading started...', 'color: #3b82f6');
    });

    // ✅ LOG 3: When metadata (duration etc.) is ready
    audio.addEventListener('loadedmetadata', () => {
      console.log(`%c✅ Audio: File loaded! Duration = ${audio.duration.toFixed(1)}s`, 'color: #22c55e; font-weight: bold');
    });

    // ✅ LOG 4: When enough data is buffered to play
    audio.addEventListener('canplay', () => {
      console.log('%c▶️  Audio: Ready to play (canplay event)', 'color: #22c55e');
    });

    // ✅ LOG 5: When fully buffered
    audio.addEventListener('canplaythrough', () => {
      console.log('%c✅ Audio: Fully buffered (canplaythrough)', 'color: #16a34a; font-weight: bold');
    });

    // ✅ LOG 6: When audio actually starts playing
    audio.addEventListener('play', () => {
      console.log('%c🎶 Audio: PLAYING NOW ✅', 'color: #f59e0b; font-weight: bold; font-size: 13px');
    });

    // ✅ LOG 7: When audio is paused
    audio.addEventListener('pause', () => {
      console.log('%c⏸️  Audio: Paused', 'color: #94a3b8');
    });

    // ✅ LOG 8: Track buffering progress
    audio.addEventListener('progress', () => {
      if (audio.buffered.length > 0) {
        const buffered = audio.buffered.end(0).toFixed(1);
        const duration = audio.duration ? audio.duration.toFixed(1) : '?';
        console.log(`%c📶 Buffering: ${buffered}s / ${duration}s loaded`, 'color: #64748b');
      }
    });

    // ✅ LOG 9: If file fails to load
    audio.addEventListener('error', (e) => {
      const errors = {
        1: 'ABORTED - User aborted the download',
        2: 'NETWORK - Network error while downloading',
        3: 'DECODE - Error decoding the audio file',
        4: 'SRC_NOT_SUPPORTED - File not found or format not supported ❌',
      };
      const msg = errors[audio.error?.code] || 'Unknown error';
      console.error(`%c❌ Audio Error: ${msg}`, 'color: red; font-weight: bold; font-size: 13px');
      console.error('👉 Check: Is /public/song.mp3 present? Is the filename correct?');
    });

    // ✅ LOG 10: On loop — restart from second 20 instead of 0
    audio.addEventListener('ended', () => {
      console.log(`%c🔁 Loop: restarting from ${START_TIME}s`, 'color: #a855f7');
      audio.currentTime = START_TIME;
      audio.play().catch(e => console.warn('Loop replay failed:', e.message));
    });

    return () => {
      audio.removeEventListener('loadstart', () => {});
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('canplay', () => {});
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('play', () => {});
      audio.removeEventListener('pause', () => {});
      audio.removeEventListener('progress', () => {});
      audio.removeEventListener('error', () => {});
    };
  }, []);

  // ✅ KEY FIX: When user taps "Tap to Open" gate fold → shouldPlay becomes true → music starts
  // This works on mobile because the gate fold tap IS a real user interaction
  useEffect(() => {
    if (shouldPlay && !isPlaying && audioRef.current) {
      console.log('%c👆 Gate fold opened — attempting to play music...', 'color: #f59e0b');
      audioRef.current.currentTime = START_TIME; // ⏩ Skip first 20 seconds
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log(`%c🎶 Music started from ${START_TIME}s on gate fold open! ✅`, 'color: #22c55e; font-weight: bold');
        })
        .catch(e => {
          console.warn('%c⚠️ Autoplay blocked (browser policy):', 'color: orange', e.message);
          console.warn('👉 User must press 🎵 button manually.');
        });
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      console.log('⏸️  User paused the music');
    } else {
      audio.currentTime = audio.currentTime < START_TIME ? START_TIME : audio.currentTime; // ⏩ Ensure we never play before 20s
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log(`%c✅ User pressed Play — music started from ${audio.currentTime.toFixed(1)}s!`, 'color: #22c55e; font-weight: bold');
        })
        .catch(e => console.error('❌ Play failed:', e.message));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        className={`audio-toggle-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        title={isPlaying ? (language === 'hi' ? 'संगीत रोकें' : 'Pause Music') : (language === 'hi' ? 'संगीत बजाएं' : 'Play Music')}
      >
        {isPlaying ? (
          <span className="icon">⏸</span>
        ) : (
          <span className="icon">🎵</span>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
