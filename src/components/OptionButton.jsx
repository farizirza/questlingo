import { motion } from "framer-motion";

export default function OptionButton({
  option,
  index,
  isSelected,
  isCorrect,
  disabled,
  onClick,
}) {
  // Handle both string and object formats
  const optionText = typeof option === "string" ? option : option.text;

  let buttonClass =
    "p-4 rounded-xl font-bold text-left w-full text-white border-2 drop-shadow-md";

  if (!disabled) {
    buttonClass +=
      " bg-gradient-to-r from-purple-400 to-pink-400 border-white border-opacity-30 hover:shadow-lg";
  } else if (isCorrect) {
    buttonClass +=
      " bg-gradient-to-r from-green-400 to-emerald-400 border-green-500";
  } else if (isSelected) {
    buttonClass +=
      " bg-gradient-to-r from-red-400 to-orange-400 border-red-500";
  } else {
    buttonClass +=
      " bg-gradient-to-r from-slate-300 to-slate-400 border-white border-opacity-20 opacity-60 text-gray-900";
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      whileHover={!disabled ? { scale: 1.05, rotate: 1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <span className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-xs font-black border border-white">
          {String.fromCharCode(65 + index)}
        </span>
        {optionText}
      </span>
    </motion.button>
  );
}
