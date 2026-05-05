import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiTrendingUp,
  FiClock,
  FiCheck,
  FiX,
  FiZap,
  FiHome,
  FiRefreshCw,
  FiEdit,
} from "react-icons/fi";
import { useGame } from "../hooks/useGame";

export default function Result() {
  const navigate = useNavigate();
  const game = useGame();

  // Calculate accuracy percentage
  const accuracy = game.stats.accuracy || 0;
  const isPassed = accuracy >= 70;

  // Trigger confetti on pass
  useEffect(() => {
    if (isPassed) {
      // Lightweight confetti config
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        duration: 2000,
      });
    }
  }, [isPassed]);

  const handleRetry = () => {
    game.resetGame();
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-32 right-16 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-20"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-2xl opacity-20"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="text-center space-y-8 max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiCheckCircle className="text-5xl md:text-6xl text-green-300" />
          <h1 className="text-5xl md:text-6xl font-black drop-shadow-lg">
            Quiz Complete!
          </h1>
        </motion.div>

        {/* Pass/Fail Badge */}
        <motion.div
          className={`text-7xl font-black px-8 py-6 rounded-3xl border-3 drop-shadow-xl ${
            isPassed
              ? "bg-gradient-to-r from-green-300 to-emerald-300 border-white text-green-900"
              : "bg-gradient-to-r from-red-300 to-orange-300 border-white text-red-900"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {" "}
          {isPassed ? (
            <div className="flex items-center justify-center gap-2">
              <FiCheckCircle className="text-3xl" />
              <span>PASS</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <FiXCircle className="text-3xl" />
              <span>FAIL</span>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {/* Score Card */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 border-2 border-white border-opacity-40 drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FiBarChart2 className="text-lg" />
              <p className="text-sm font-bold text-white opacity-80">
                Final Score
              </p>
            </div>
            <motion.p
              className="text-4xl font-black text-yellow-300"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {game.score}/{game.stats.totalQuestions}
            </motion.p>
          </motion.div>

          {/* Accuracy Card */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 border-2 border-white border-opacity-40 drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-lg" />
              <p className="text-sm font-bold text-white opacity-80">
                Accuracy
              </p>
            </div>
            <p className="text-4xl font-black text-cyan-300">{accuracy}%</p>
          </motion.div>

          {/* Time Card */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 border-2 border-white border-opacity-40 drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FiClock className="text-lg" />
              <p className="text-sm font-bold text-white opacity-80">
                Time Spent
              </p>
            </div>
            <p className="text-3xl font-black text-pink-300">
              {Math.floor((1200 - game.timeLeft) / 60)}m{" "}
              {Math.floor((1200 - game.timeLeft) % 60)}s
            </p>
          </motion.div>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          className="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-6 border-2 border-white border-opacity-30 space-y-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FiCheck className="text-lg" />
              <span className="font-bold text-white">Correct Answers</span>
            </div>
            <span className="text-2xl font-black text-green-300">
              {game.stats.correctAnswers}
            </span>
          </div>
          <motion.div
            className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden border border-white border-opacity-20"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
            }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(game.stats.correctAnswers / game.stats.totalQuestions) * 100}%`,
              }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            />
          </motion.div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <FiX className="text-lg" />
              <span className="font-bold text-white">Incorrect Answers</span>
            </div>
            <span className="text-2xl font-black text-red-300">
              {game.stats.incorrectAnswers}
            </span>
          </div>
          <motion.div
            className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden border border-white border-opacity-20"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <motion.div
              className="bg-gradient-to-r from-red-400 to-orange-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(game.stats.incorrectAnswers / game.stats.totalQuestions) * 100}%`,
              }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Pass Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          {isPassed ? (
            <div className="flex items-center justify-center gap-2 text-xl font-black text-white drop-shadow-md">
              <FiCheckCircle />
              <p>Awesome! You passed the quiz!</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xl font-bold text-white drop-shadow-md">
              <FiZap />
              <p>Keep practicing! You need at least 70% to pass.</p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="block px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiHome className="text-lg" />
              <span>Home</span>
            </Link>
          </motion.div>

          <motion.button
            onClick={handleRetry}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw className="text-lg" />
            <span>Retry</span>
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/review"
              className="block px-6 py-3 bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiEdit className="text-lg" />
              <span>Review</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
