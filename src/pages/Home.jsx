import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBook, FiAward, FiClock, FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Soft Ethereal Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-success/5 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* CSS Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Column - Typography & CTA (Editorial Split) */}
        <motion.div
          className="md:col-span-7 space-y-10 py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-slate-200/50 px-4 py-2 rounded-full shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Quest Mode Active</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] text-slate-900 tracking-[-0.03em]">
              Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-indigo-500">Language</span><br />
              Through Play.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Embark on an interactive journey to sharpen your grammar, listening, and vocabulary skills.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <Link to="/game" className="group inline-flex items-center gap-6 bg-primary text-white pl-8 pr-3 py-3 rounded-full font-bold text-xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] transition-all duration-500 ease-spring active:scale-[0.98]">
              <span>Start Quest</span>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:bg-white/30 group-hover:translate-x-1 group-hover:scale-105 group-hover:-translate-y-[1px]">
                <FiArrowRight className="text-2xl" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column - Bento Grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <motion.div
            className="col-span-2 bezel-outer"
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="bezel-inner p-8 h-full flex flex-col justify-center gap-4 bg-gradient-to-br from-white to-slate-50">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary mb-2 shadow-inner">
                <FiBook className="text-3xl" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-800 mb-1">Interactive Quizzes</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Engage with image, audio, and grammar challenges.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="col-span-1 bezel-outer"
            initial={{ opacity: 0, y: 40, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="bezel-inner p-6 h-full flex flex-col items-start gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-success shadow-inner">
                <FiClock className="text-2xl" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-800">Timed</h3>
                <p className="text-slate-500 text-xs font-medium">20 mins per quest</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="col-span-1 bezel-outer"
            initial={{ opacity: 0, y: 40, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="bezel-inner p-6 h-full flex flex-col items-start gap-4">
               <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-destructive shadow-inner">
                <FiAward className="text-2xl" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-800">Scoring</h3>
                <p className="text-slate-500 text-xs font-medium">Track your accuracy</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
