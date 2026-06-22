import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause, FiVolume2 } from "react-icons/fi";

export default function CustomAudioPlayer({ src, className = "" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Stop audio if src changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [src]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current?.currentTime || 0;
    const duration = audioRef.current?.duration || 1;
    setProgress((current / duration) * 100 || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
    // Reset after a short delay
    setTimeout(() => setProgress(0), 1000);
  };

  return (
    <div className={`w-full bg-slate-50 rounded-[2rem] border border-slate-100 p-8 flex flex-col items-center shadow-inner ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />
      
      <div className="flex items-center justify-center gap-6 w-full">
        <button
          onClick={toggleAudio}
          className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
        >
          {isPlaying ? <FiPause className="text-2xl" /> : <FiPlay className="text-2xl ml-1" />}
        </button>
        
        <div className="flex-1 max-w-xs flex items-center gap-3">
          <FiVolume2 className="text-slate-400 shrink-0" />
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
      <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mt-6">
        {isPlaying ? "Playing Audio..." : "Click to Listen"}
      </p>
    </div>
  );
}
