import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiAward,
  FiTarget,
  FiClock,
  FiCheck,
  FiSkipForward,
  FiSquare,
  FiLoader
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

  const backgroundOrbs = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-success/5 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      {/* CSS Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4 font-sans relative overflow-hidden">
        {backgroundOrbs}
        <motion.div
          className="text-center space-y-6 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex justify-center">
            <motion.div
              className="w-20 h-20 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center justify-center border border-slate-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FiLoader className="text-4xl text-primary" />
            </motion.div>
          </div>
          <p className="text-2xl font-display font-bold text-slate-800 tracking-tight">
            Preparing your quest...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4 font-sans relative overflow-hidden">
        {backgroundOrbs}
        <motion.div
          className="bezel-outer max-w-md w-full relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="bezel-inner p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto shadow-inner text-destructive">
              <FiAlertCircle className="text-4xl" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-slate-800 tracking-tight mb-2">Oops!</p>
              <p className="text-slate-500 font-medium">{error}</p>
            </div>
            <Link
              to="/"
              className="inline-flex w-full justify-center items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-slate-800 transition-all duration-300 ease-spring active:scale-[0.98]"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Game finished state
  if (game.isFinished) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4 font-sans relative overflow-hidden">
        {backgroundOrbs}
        <motion.div
          className="bezel-outer max-w-md w-full relative z-10"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="bezel-inner p-10 text-center space-y-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner text-success"
            >
              <FiCheckCircle className="text-5xl" />
            </motion.div>
            
            <motion.h1
              className="text-4xl font-display font-bold text-slate-800 tracking-tight"
            >
              Quest Completed
            </motion.h1>
            
            <div className="bg-slate-50 rounded-[1.5rem] p-6 space-y-3 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Final Score</p>
              <motion.div
                className="text-6xl font-display font-black text-slate-800 tracking-tighter"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {game.score}
              </motion.div>
              <p className="text-sm font-medium text-slate-500">out of {game.questions.length} questions</p>
            </div>
            
            <p className="text-sm font-medium text-slate-400 animate-pulse">Generating your report...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = game.currentQuestion;

  return (
    <div className="min-h-[100dvh] bg-background p-4 sm:p-6 md:p-8 relative font-sans overflow-hidden">
      {backgroundOrbs}

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-6 md:gap-8 pt-4">
        
        {/* Top Dashboard Nav - Glass Pill */}
        <motion.div 
          className="glass-pill rounded-[2rem] p-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 sticky top-4 z-50"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Score Badge */}
          <div className="flex-1 min-w-[110px] bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 mb-1 text-slate-400">
              <FiAward className="text-sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">Score</p>
            </div>
            <motion.p
              className="text-2xl font-display font-bold text-slate-800"
              key={game.score}
              initial={{ scale: 1.2, color: "#2563EB" }}
              animate={{ scale: 1, color: "#1E293B" }}
              transition={{ duration: 0.4 }}
            >
              {game.score}
            </motion.p>
          </div>

          {/* Progress Section */}
          <div className="flex-2 w-full md:w-auto px-2 order-last md:order-none flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <FiTarget className="text-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.15em]">
                Progress <span className="text-slate-800 ml-1">{game.currentIndex + 1} / {game.questions.length}</span>
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full md:w-64 bg-slate-200/50 rounded-full h-3 overflow-hidden border border-slate-200 shadow-inner">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${game.progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Time Badge */}
          <div className="flex-1 min-w-[110px] bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 mb-1 text-slate-400">
              <FiClock className="text-sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">Time</p>
            </div>
            <p
              className={`text-2xl font-display font-bold ${
                game.timeLeft < 300
                  ? "text-destructive animate-pulse"
                  : "text-slate-800"
              }`}
            >
              {game.formattedTime}
            </p>
          </div>
        </motion.div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div 
              key={game.currentIndex}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-6"
            >
              {/* Question Renderer handles the content */}
              <QuestionRenderer
                question={currentQuestion}
                currentIndex={game.currentIndex}
                totalQuestions={game.questions.length}
                isAnswered={game.isAnswered}
                selectedAnswer={game.answers[game.currentIndex]?.selected}
                onAnswer={game.selectAnswer}
              />

              {/* Feedback Banner */}
              {game.isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border ${
                    game.answers[game.currentIndex]?.isCorrect
                      ? "bg-success/10 border-success/20 text-success"
                      : "bg-destructive/10 border-destructive/20 text-destructive"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner ${
                      game.answers[game.currentIndex]?.isCorrect ? "bg-success" : "bg-destructive"
                    }`}>
                      {game.answers[game.currentIndex]?.isCorrect ? <FiCheck className="text-2xl" /> : <FiX className="text-2xl" />}
                    </div>
                    <span className="font-display font-bold text-xl">
                      {game.answers[game.currentIndex]?.isCorrect ? "Brilliant!" : "Not quite right."}
                    </span>
                  </div>
                  
                  {/* Auto-advance message */}
                  {game.currentIndex < game.questions.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/50 px-4 py-2 rounded-xl"
                    >
                      <FiSkipForward />
                      <span>Next in 1.5s...</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Game */}
        <motion.div 
          className="mt-8 flex justify-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => game.finishGame()}
            className="group flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm tracking-wide uppercase"
          >
            <FiSquare className="transition-transform group-hover:scale-110" />
            <span>End Session Early</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
