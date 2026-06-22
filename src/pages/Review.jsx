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
    <div className="min-h-[100dvh] bg-background p-4 sm:p-8 relative overflow-hidden font-sans pb-12">
      {/* Soft Ethereal Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
        <motion.div
          className="absolute top-[15%] right-[10%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[100px]"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] bg-success/5 rounded-full blur-[100px]"
          animate={{ x: [0, 35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 pt-4 md:pt-8">
        {/* Header */}
        <motion.div
          className="bezel-outer mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="bezel-inner p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-slate-100 rounded-[1.2rem] flex items-center justify-center text-slate-800 shadow-inner">
                <FiEdit className="text-2xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
                Answer Review
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-[1.5rem] p-5 text-center border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Total</p>
                <p className="text-4xl font-display font-black text-slate-800">{game.questions.length}</p>
              </div>
              <div className="bg-emerald-50 rounded-[1.5rem] p-5 text-center border border-emerald-100/50">
                <div className="flex items-center justify-center gap-1.5 text-success mb-1">
                  <FiCheck className="text-sm" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em]">Correct</p>
                </div>
                <p className="text-4xl font-display font-black text-success">
                  {game.stats.correctAnswers}
                </p>
              </div>
              <div className="bg-rose-50 rounded-[1.5rem] p-5 text-center border border-rose-100/50">
                <div className="flex items-center justify-center gap-1.5 text-destructive mb-1">
                  <FiX className="text-sm" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em]">Incorrect</p>
                </div>
                <p className="text-4xl font-display font-black text-destructive">
                  {game.stats.incorrectAnswers}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <motion.div
          className="space-y-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {game.questions.map((question, idx) => {
            const answer = game.answers[idx];
            const isCorrect = answer?.isCorrect;

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
                className="bezel-outer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { ease: [0.32, 0.72, 0, 1] } },
                }}
              >
                <div className="bezel-inner p-8">
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <FiHelpCircle />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">Question {idx + 1}</h3>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isCorrect
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <FiCheckCircle className="text-sm" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <FiXCircle className="text-sm" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="mb-8">
                    <p className="text-2xl font-display font-bold text-slate-900 leading-tight">
                      {question.question}
                    </p>
                  </div>

                  {/* Media */}
                  {question.media_url && (
                    <div className="mb-8 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-6 shadow-inner">
                      {question.type === "audio" ? (
                        <audio controls className="w-full max-w-md" controlsList="nodownload">
                          <source src={question.media_url} type="audio/mpeg" />
                        </audio>
                      ) : (
                        <img
                          src={question.media_url}
                          alt="Question media"
                          className="w-full h-auto max-h-48 object-contain"
                        />
                      )}
                    </div>
                  )}

                  {/* Answer Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-6 rounded-[1.5rem] border ${
                        isCorrect
                          ? "bg-success/5 border-success/10"
                          : "bg-destructive/5 border-destructive/10"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                        Your Answer
                      </p>
                      <p className={`text-lg font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                        {userAnswerDisplay || "Not answered"}
                      </p>
                    </div>

                    {!isCorrect ? (
                      <div className="p-6 rounded-[1.5rem] border bg-success/5 border-success/10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                          Correct Answer
                        </p>
                        <p className="text-lg font-bold text-success">
                          {correctAnswerDisplay}
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex flex-col justify-center items-center text-center">
                        <p className="text-slate-400 font-medium flex items-center gap-2">
                          <FiCheck className="text-lg" />
                          <span>Perfect Match</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 rounded-full font-bold text-slate-700 border border-slate-200 shadow-sm transition-all duration-300 active:scale-[0.98]"
          >
            <FiHome className="text-xl text-slate-400 group-hover:text-primary transition-colors" />
            <span>Home</span>
          </Link>

          <Link
            to="/result"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 rounded-full font-bold text-slate-700 border border-slate-200 shadow-sm transition-all duration-300 active:scale-[0.98]"
          >
            <FiArrowLeft className="text-xl text-slate-400 group-hover:text-primary transition-colors" />
            <span>Back to Results</span>
          </Link>

          <Link
            to="/game"
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-full font-bold shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 active:scale-[0.98]"
          >
            <FiRefreshCw className="text-xl group-hover:rotate-180 transition-transform duration-500" />
            <span>Retake Quiz</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
