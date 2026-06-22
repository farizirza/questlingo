import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause, FiVolume2 } from "react-icons/fi";
import OptionButton from "./OptionButton";

export default function AudioQuestion({
  question,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Stop audio if moving to next question
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [question]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100 || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
    // Reset after a short delay
    setTimeout(() => setProgress(0), 1000);
  };

  return (
    <div className="bezel-outer">
      <div className="bezel-inner p-8 md:p-10 flex flex-col items-center max-w-2xl mx-auto">
        
        {/* Custom Audio Player */}
        <div className="w-full bg-slate-50 rounded-[2rem] border border-slate-100 p-8 flex flex-col items-center mb-8 shadow-inner">
          <audio
            ref={audioRef}
            src={question.media_url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="hidden"
          />
          
          <div className="flex items-center justify-center gap-6 w-full">
            <button
              onClick={toggleAudio}
              className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {isPlaying ? <FiPause className="text-2xl" /> : <FiPlay className="text-2xl ml-1" />}
            </button>
            
            <div className="flex-1 max-w-xs flex items-center gap-3">
              <FiVolume2 className="text-slate-400" />
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

        {/* Question Text */}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight mb-8 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {question.options.map((option, idx) => {
            const optKey = typeof option === "string" ? option : option.key;
            const optText = typeof option === "string" ? option : option.text;
            
            return (
              <OptionButton
                key={optKey || idx}
                text={optText}
                onClick={() => onAnswer(optKey)}
                isSelected={selectedAnswer === optKey}
                isCorrect={isAnswered && optKey === question.answer}
                disabled={isAnswered}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
