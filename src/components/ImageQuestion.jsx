import { motion } from "framer-motion";
import OptionButton from "./OptionButton";

export default function ImageQuestion({
  question,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="bezel-outer">
      <div className="bezel-inner p-8 md:p-10 flex flex-col md:flex-row gap-8">
        
        {/* Image Container - Nested Architecture */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
          <img
            src={question.media_url}
            alt="Question"
            className="w-full h-auto max-h-64 object-contain rounded-xl"
          />
        </div>

        {/* Question & Options */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight mb-6">
            {question.question}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    </div>
  );
}
