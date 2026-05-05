import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHeadphones, FiVolume2 } from "react-icons/fi";
import OptionButton from "./OptionButton";

export default function AudioQuestion({
  question,
  currentIndex,
  totalQuestions,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  const audioRef = useRef(null);

  // Reset audio and reload when media URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [question.media_url]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
    >
      {/* Question Container */}
      <div className="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-8 border-2 border-white border-opacity-30 drop-shadow-lg">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FiHeadphones className="text-lg" />
            <p className="text-sm font-bold text-white opacity-80">
              Question {currentIndex + 1}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">
            {question.question}
          </h2>

          {/* Audio Player */}
          {question.media_url && (
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 border-2 border-white border-opacity-30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <FiVolume2 className="text-lg" />
                <p className="text-sm font-bold text-white drop-shadow-md">
                  Listen carefully:
                </p>
              </div>
              <audio
                ref={audioRef}
                controls
                className="w-full rounded-lg"
                controlsList="nodownload"
              >
                <source src={question.media_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </motion.div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options &&
          question.options.map((option, idx) => {
            const optionKey = typeof option === "string" ? option : option.key;
            const isSelected = selectedAnswer === optionKey;
            const isCorrect = optionKey === question.answer;

            return (
              <OptionButton
                key={idx}
                option={option}
                index={idx}
                isSelected={isSelected}
                isCorrect={isCorrect}
                disabled={isAnswered}
                onClick={() => !isAnswered && onAnswer(optionKey)}
              />
            );
          })}
      </div>
    </motion.div>
  );
}
