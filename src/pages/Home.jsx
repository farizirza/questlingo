import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBook, FiZap, FiStar, FiPlay } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-green-300 rounded-full blur-2xl opacity-20"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title with playful bounce */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiBook className="text-6xl md:text-7xl text-yellow-200" />
            <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white drop-shadow-lg">
              QUESTLINGO
            </h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="flex items-center justify-center gap-2 text-lg md:text-2xl font-bold text-white drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span>Master English with Fun!</span>
          <FiZap className="text-2xl md:text-3xl" />
        </motion.div>

        <motion.div
          className="text-base md:text-lg text-white max-w-2xl drop-shadow-md font-semibold space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>Challenge yourself with grammar, audio, and image questions.</p>
          <div className="flex items-center justify-center gap-2">
            <span>Learn. Play. Succeed.</span>
            <FiStar className="text-xl" />
          </div>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          className="grid grid-cols-3 gap-4 my-6 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-3 border-2 border-white border-opacity-30">
            <p className="text-3xl">25</p>
            <p className="text-xs font-semibold">Questions</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-3 border-2 border-white border-opacity-30">
            <p className="text-3xl">20m</p>
            <p className="text-xs font-semibold">Time</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-3 border-2 border-white border-opacity-30">
            <p className="text-3xl">100%</p>
            <p className="text-xs font-semibold">Fun</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/game">
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 rounded-full font-bold text-lg text-white drop-shadow-lg border-2 border-white border-opacity-50 flex items-center gap-2"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlay className="text-lg" />
              <span>Start Quiz Now!</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer message */}
        <motion.div
          className="flex items-center justify-center gap-2 text-sm text-white drop-shadow-md font-semibold"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiStar />
          <span>Let's make learning fun!</span>
          <FiStar />
        </motion.div>
      </motion.div>
    </div>
  );
}
