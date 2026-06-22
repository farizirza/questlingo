import { motion } from "framer-motion";
import OptionButton from "./OptionButton";

export default function GrammarQuestion({
  question,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="bezel-outer">
      <div className="bezel-inner p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight mb-8">
          {question.question}
        </h2>
        <div className="flex flex-col gap-4">
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
