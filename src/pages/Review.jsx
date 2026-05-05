import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiCheck,
  FiX,
  FiHelpCircle,
  FiCheckCircle,
  FiXCircle,
  FiHome,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";
import { useGame } from "../hooks/useGame";

export default function Review() {
  const game = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-40 right-24 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-20"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-16 w-28 h-28 bg-green-300 rounded-full blur-2xl opacity-20"
        animate={{ x: [0, 35, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8 bg-white bg-opacity-15 backdrop-blur rounded-2xl p-6 border-2 border-white border-opacity-30 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-2 text-4xl md:text-5xl font-black mb-4 drop-shadow-md"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiEdit className="text-4xl md:text-5xl" />
            <h1>Answer Review</h1>
          </motion.div>
          <div className="grid grid-cols-3 gap-4 text-sm font-bold">
            <div className="bg-white bg-opacity-10 rounded-lg p-2 text-center">
              <p className="opacity-80">Total Questions</p>
              <p className="text-2xl">{game.questions.length}</p>
            </div>
            <div className="bg-green-400 bg-opacity-20 rounded-lg p-2 text-center border border-green-400">
              <div className="flex items-center justify-center gap-1">
                <FiCheck className="text-lg" />
                <p className="opacity-80">Correct</p>
              </div>
              <p className="text-2xl text-green-300">
                {game.stats.correctAnswers}
              </p>
            </div>
            <div className="bg-red-400 bg-opacity-20 rounded-lg p-2 text-center border border-red-400">
              <div className="flex items-center justify-center gap-1">
                <FiX className="text-lg" />
                <p className="opacity-80">Incorrect</p>
              </div>
              <p className="text-2xl text-red-300">
                {game.stats.incorrectAnswers}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <motion.div
          className="space-y-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {game.questions.map((question, idx) => {
            const answer = game.answers[idx];
            const isCorrect = answer?.isCorrect;

            // Handle both string and object option formats
            const userAnswerText = game.questions[idx]?.options?.find((opt) => {
              const optKey = typeof opt === "string" ? opt : opt.key;
              return optKey === answer?.selected;
            });

            const userAnswerDisplay =
              typeof userAnswerText === "string"
                ? userAnswerText
                : userAnswerText?.text;

            const correctAnswerText = game.questions[idx]?.options?.find(
              (opt) => {
                const optKey = typeof opt === "string" ? opt : opt.key;
                return optKey === question.answer;
              },
            );

            const correctAnswerDisplay =
              typeof correctAnswerText === "string"
                ? correctAnswerText
                : correctAnswerText?.text;

            return (
              <motion.div
                key={idx}
                className={`rounded-2xl border-2 p-6 drop-shadow-lg ${
                  isCorrect
                    ? "bg-green-400 bg-opacity-15 border-green-400"
                    : "bg-red-400 bg-opacity-15 border-red-400"
                }`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Question Number and Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiHelpCircle className="text-lg" />
                    <h3 className="text-lg font-bold drop-shadow-md">
                      Question {idx + 1}
                    </h3>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-black drop-shadow-md flex items-center gap-1 ${
                      isCorrect
                        ? "bg-gradient-to-r from-green-300 to-emerald-300 text-green-900"
                        : "bg-gradient-to-r from-red-300 to-orange-300 text-red-900"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <FiCheck className="text-lg" />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <FiX className="text-lg" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Question Text */}
                <div className="mb-4">
                  <p className="text-sm font-bold opacity-80 mb-2">Question:</p>
                  <p className="text-lg font-semibold drop-shadow-md">
                    {question.question}
                  </p>
                </div>

                {/* Media if available */}
                {question.media_url && (
                  <div className="mb-4 rounded-2xl overflow-hidden border-2 border-white border-opacity-30">
                    <img
                      src={question.media_url}
                      alt="Question media"
                      className="w-full h-auto max-h-48 object-cover"
                    />
                  </div>
                )}

                {/* User Answer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl border-2 drop-shadow-md ${
                      isCorrect
                        ? "bg-green-400 bg-opacity-20 border-green-400"
                        : "bg-red-400 bg-opacity-20 border-red-400"
                    }`}
                  >
                    <p className="text-xs font-bold opacity-80 mb-2">
                      Your Answer:
                    </p>
                    <p className="text-lg font-black drop-shadow-md">
                      {userAnswerDisplay || "Not answered"}
                    </p>
                  </div>

                  {/* Correct Answer */}
                  {!isCorrect && (
                    <div className="p-4 rounded-xl border-2 bg-green-400 bg-opacity-20 border-green-400 drop-shadow-md">
                      <p className="text-xs font-bold opacity-80 mb-2">
                        Correct Answer:
                      </p>
                      <p className="text-lg font-black text-green-200">
                        {correctAnswerDisplay}
                      </p>
                    </div>
                  )}

                  {isCorrect && (
                    <div className="p-4 rounded-xl border-2 bg-green-400 bg-opacity-20 border-green-400 drop-shadow-md">
                      <p className="text-xs font-bold opacity-80 mb-2">
                        Status:
                      </p>
                      <p className="text-lg font-black text-green-200 flex items-center gap-2">
                        <FiCheckCircle className="text-lg" />
                        <span>Perfect!</span>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
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

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/result"
              className="block px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="text-lg" />
              <span>Results</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/game"
              className="block px-6 py-3 bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 rounded-full font-bold text-white drop-shadow-lg border-2 border-white border-opacity-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="text-lg" />
              <span>Retake</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
