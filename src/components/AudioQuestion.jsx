import { motion } from "framer-motion";
import OptionButton from "./OptionButton";
import CustomAudioPlayer from "./CustomAudioPlayer";

export default function AudioQuestion({
  question,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="bezel-outer">
      <div className="bezel-inner p-8 md:p-10 flex flex-col items-center max-w-2xl mx-auto">
        
        {/* Custom Audio Player */}
        <CustomAudioPlayer src={question.media_url} className="mb-8" />

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
