import { useState, useEffect, useRef } from 'react';

export default function Controls() {
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. SETUP AUDIO
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // 2. TRY AUTOPLAY (MUTED)
    // Browsers allow autoplay ONLY if muted. We start here so the track is running.
    audio.muted = true;
    audio.play().catch((e) => console.log("Autoplay blocked:", e));

    // 3. THE "FIRST CLICK" HACK
    // We listen for the very first interaction anywhere on the page to unmute.
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch((e) => console.error("Audio Play Failed", e));
        setIsMuted(false);
      }
      // Remove listeners so this only runs once
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    // Add global listeners
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation(); // Prevent triggering the global listener if clicking the button itself
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => console.log(e));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-4 pointer-events-auto">
      
      {/* AUDIO BUTTON */}
      <button
        onClick={toggleAudio}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition hover:bg-white/20 hover:border-white/30"
        aria-label="Toggle Audio"
      >
        {isMuted ? (
          // MUTED ICON (But pulsing to show it's ready)
          <div className="relative">
             <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
             </svg>
          </div>
        ) : (
          // PLAYING ICON
          <div className="relative flex items-center justify-center">
             <svg className="w-4 h-4 text-neon-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* FULLSCREEN BUTTON */}
      <button
        onClick={toggleFullscreen}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition hover:bg-white/20 hover:border-white/30"
      >
        {isFullscreen ? (
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
    </div>
  );
}