import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBook,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiAward,
  FiTarget,
  FiClock,
  FiCheck,
  FiSkipForward,
  FiSquare,
} from "react-icons/fi";
import { useQuestions } from "../hooks/useQuestions";
import { useGame } from "../hooks/useGame";
import QuestionRenderer from "../components/QuestionRenderer";

export default function Game() {
  const navigate = useNavigate();
  const { questions: fetchedQuestions, loading, error } = useQuestions();
  const game = useGame();

  // Initialize game with fetched questions
  useEffect(() => {
    if (fetchedQuestions.length > 0) {
      game.setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions]);

  // Timer effect - tick every second
  useEffect(() => {
    if (game.isFinished || game.questions.length === 0) return;

    const timer = setInterval(() => {
      game.tickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [game.isFinished, game.questions.length]);

  // Redirect to results when game finishes
  useEffect(() => {
    if (game.isFinished && game.questions.length > 0) {
      const timer = setTimeout(() => {
        navigate("/result");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [game.isFinished, navigate, game.questions.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white flex items-center justify-center px-4">
        <motion.div
          className="text-center space-y-4"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiBook className="text-5xl text-yellow-300" />
            </motion.div>
          </div>
          <p className="text-lg font-bold drop-shadow-md">
            Loading questions...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white flex items-center justify-center px-4">
        <motion.div
          className="text-center space-y-4 max-w-md bg-white bg-opacity-20 backdrop-blur rounded-2xl p-8 border-2 border-white"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiAlertCircle className="text-6xl text-yellow-300 mx-auto mb-4" />
          <p className="text-2xl font-bold">Oops!</p>
          <p className="text-lg font-semibold">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 rounded-full font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  // Game finished state
  if (game.isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white flex items-center justify-center px-4">
        <motion.div
          className="text-center space-y-6 max-w-md bg-white bg-opacity-15 backdrop-blur rounded-3xl p-8 border-2 border-white drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex justify-center mb-2"
          >
            <FiCheckCircle className="text-6xl text-green-300" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Quiz Completed!
          </motion.h1>
          <div className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-6 space-y-4 text-gray-900 font-bold drop-shadow-lg">
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {game.score}
            </motion.div>
            <p className="text-lg">out of {game.questions.length} questions</p>
            <p className="text-lg">
              Accuracy:{" "}
              <span className="font-bold text-blue-400">
                {game.stats.accuracy}%
              </span>
            </p>
          </div>
          <p className="text-sm text-slate-400">Redirecting to results...</p>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = game.currentQuestion;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white p-4 relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 rounded-full blur-xl opacity-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-24 h-24 bg-green-300 rounded-full blur-xl opacity-20"
        animate={{ x: [0, 25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-6 mb-8 border-2 border-white border-opacity-30">
          <div className="flex justify-between items-center gap-4">
            <motion.div className="flex-1">
              <div className="flex items-center gap-2">
                <FiAward className="text-lg text-yellow-300" />
                <p className="text-xs font-bold text-white opacity-80">Score</p>
              </div>
              <motion.p
                className="text-3xl font-black text-yellow-300"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                key={game.score}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {game.score}
              </motion.p>
            </motion.div>
            <motion.div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <FiTarget className="text-lg text-orange-300" />
                <p className="text-xs font-bold text-white opacity-80">
                  Progress
                </p>
              </div>
              <p className="text-2xl font-bold text-white">
                {game.currentIndex + 1}/{game.questions.length}
              </p>
            </motion.div>
            <motion.div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-2">
                <FiClock className="text-lg text-cyan-300" />
                <p className="text-xs font-bold text-white opacity-80">Time</p>
              </div>
              <p
                className={`text-3xl font-black ${
                  game.timeLeft < 300
                    ? "text-red-300 animate-pulse"
                    : "text-cyan-300"
                }`}
              >
                {game.formattedTime}
              </p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mt-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${game.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="space-y-8">
            {/* Question Renderer - Switches based on question type */}
            <QuestionRenderer
              question={currentQuestion}
              currentIndex={game.currentIndex}
              totalQuestions={game.questions.length}
              isAnswered={game.isAnswered}
              selectedAnswer={game.answers[game.currentIndex]?.selected}
              onAnswer={game.selectAnswer}
            />

            {/* Feedback */}
            {game.isAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-2xl text-center font-bold text-lg border-2 flex items-center justify-center gap-2 ${
                  game.answers[game.currentIndex]?.isCorrect
                    ? "bg-green-400 bg-opacity-20 border-green-400 text-green-100"
                    : "bg-red-400 bg-opacity-20 border-red-400 text-red-100"
                }`}
              >
                {game.answers[game.currentIndex]?.isCorrect ? (
                  <>
                    <FiCheck className="text-xl" />
                    <span>Correct! Amazing!</span>
                  </>
                ) : (
                  <>
                    <FiX className="text-xl" />
                    <span>Oops! Try next time</span>
                  </>
                )}
              </motion.div>
            )}

            {/* Auto-advance message */}
            {game.isAnswered &&
              game.currentIndex < game.questions.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-center text-sm font-bold text-white drop-shadow-md flex items-center justify-center gap-2"
                >
                  <FiSkipForward className="text-lg" />
                  <span>Next question in 1.5 seconds...</span>
                </motion.div>
              )}
          </div>
        )}

        {/* Skip game button */}
        <motion.div className="mt-8 flex justify-center">
          <motion.button
            onClick={() => game.finishGame()}
            className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSquare className="text-lg" />
            <span>End Quiz</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
