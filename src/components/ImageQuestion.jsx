import { motion } from "framer-motion";
import { FiImage, FiAlertCircle } from "react-icons/fi";
import OptionButton from "./OptionButton";

export default function ImageQuestion({
  question,
  currentIndex,
  totalQuestions,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
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
            <FiImage className="text-lg" />
            <p className="text-sm font-bold text-white opacity-80">
              Question {currentIndex + 1}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">
            {question.question}
          </h2>

          {/* Image Display */}
          {question.media_url ? (
            <motion.div
              className="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center min-h-64 max-h-96 border-2 border-white border-opacity-30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={question.media_url}
                alt="Question"
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </motion.div>
          ) : (
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 text-center text-white font-bold text-lg flex items-center justify-center gap-2">
              <FiAlertCircle className="text-2xl" />
              <span>No image available</span>
            </div>
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
