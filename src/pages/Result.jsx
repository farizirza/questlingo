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
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        duration: 3000,
        colors: ['#2563EB', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6']
      });
    }
  }, [isPassed]);

  const handleRetry = () => {
    game.resetGame();
    navigate("/game");
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden font-sans py-12">
      {/* Soft Ethereal Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-success/5 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <motion.div
        className="max-w-3xl w-full relative z-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Pass/Fail Banner - Double Bezel */}
        <div className="bezel-outer">
          <div className="bezel-inner p-10 flex flex-col items-center justify-center text-center">
            {isPassed ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner text-success"
                >
                  <FiCheckCircle className="text-5xl" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-800 tracking-tight mb-3">
                  Quest Passed!
                </h1>
                <p className="text-success font-bold text-lg bg-success/10 px-6 py-2 rounded-full">
                  Outstanding performance!
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner text-destructive"
                >
                  <FiXCircle className="text-5xl" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-800 tracking-tight mb-3">
                  Quest Failed
                </h1>
                <p className="text-destructive font-bold text-lg bg-destructive/10 px-6 py-2 rounded-full">
                  Keep practicing, you need 70%.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid - Asymmetrical Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Score Card */}
          <motion.div
            className="bezel-outer col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bezel-inner p-6 h-full flex flex-col items-center justify-center bg-indigo-50/30">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <FiBarChart2 className="text-xl" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Score</p>
              </div>
              <p className="text-5xl font-display font-black text-slate-800">
                {game.score}<span className="text-2xl text-slate-400">/{game.stats.totalQuestions}</span>
              </p>
            </div>
          </motion.div>

          {/* Accuracy Card */}
          <motion.div
            className="bezel-outer col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bezel-inner p-6 h-full flex flex-col items-center justify-center bg-emerald-50/30">
              <div className="flex items-center gap-2 mb-2 text-success">
                <FiTrendingUp className="text-xl" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Accuracy</p>
              </div>
              <p className="text-5xl font-display font-black text-slate-800">{accuracy}%</p>
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div
            className="bezel-outer col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bezel-inner p-6 h-full flex flex-col items-center justify-center bg-rose-50/30">
              <div className="flex items-center gap-2 mb-2 text-destructive">
                <FiClock className="text-xl" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Time</p>
              </div>
              <p className="text-4xl font-display font-black text-slate-800">
                {Math.floor((1200 - game.timeLeft) / 60)}m {Math.floor((1200 - game.timeLeft) % 60)}s
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 rounded-full font-bold text-slate-700 border border-slate-200 shadow-sm transition-all duration-300 active:scale-[0.98]"
          >
            <FiHome className="text-xl text-slate-400 group-hover:text-primary transition-colors" />
            <span>Home</span>
          </Link>

          <button
            onClick={handleRetry}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-full font-bold shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 active:scale-[0.98]"
          >
            <FiRefreshCw className="text-xl group-hover:rotate-180 transition-transform duration-500" />
            <span>Retry Quest</span>
          </button>

          <Link
            to="/review"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-bold shadow-lg transition-all duration-300 active:scale-[0.98]"
          >
            <FiEdit className="text-xl" />
            <span>Review Answers</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
