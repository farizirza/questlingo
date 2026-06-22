import { motion } from "framer-motion";

export default function OptionButton({
  text,
  onClick,
  isSelected,
  isCorrect,
  disabled,
}) {
  // Determine styles based on state
  let stateStyles = "bg-white text-slate-700 hover:bg-slate-50 border-slate-200";
  let indicatorBg = "bg-primary";
  let dotBg = "bg-white";
  
  if (disabled) {
    if (isCorrect) {
      // High contrast solid green for correct answers
      stateStyles = "bg-success text-white border-success shadow-[0_10px_20px_-10px_rgba(16,185,129,0.6)]";
      indicatorBg = "bg-white";
      dotBg = "bg-success";
    } else if (isSelected && !isCorrect) {
      // High contrast solid red for incorrect selections
      stateStyles = "bg-destructive text-white border-destructive shadow-[0_10px_20px_-10px_rgba(244,63,94,0.6)]";
      indicatorBg = "bg-white";
      dotBg = "bg-destructive";
    } else {
      // Dimmed unselected options
      stateStyles = "bg-slate-50 text-slate-400 border-slate-100 opacity-50 cursor-not-allowed";
    }
  } else if (isSelected) {
    // If we ever have a multi-step selection before confirm
    stateStyles = "bg-primary text-white border-primary shadow-[0_10px_20px_-10px_rgba(37,99,235,0.6)]";
    indicatorBg = "bg-white";
    dotBg = "bg-primary";
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full group relative flex items-center justify-between p-5 rounded-[1.5rem] border font-bold text-left transition-colors duration-300 ${stateStyles}`}
      whileHover={!disabled ? { scale: 0.99 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      <span className="text-lg">{text}</span>
      
      {/* Nested indicator circle for the Button-in-Button aesthetic */}
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        disabled && (isCorrect || isSelected) ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
      } ${indicatorBg}`}>
        <div className={`w-2 h-2 rounded-full ${dotBg}`}></div>
      </div>
    </motion.button>
  );
}
