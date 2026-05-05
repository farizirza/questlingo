import { useGameStore } from "../store/gameStore";

/**
 * Hook to access game state and actions
 * Provides easy access to store with selector optimization
 */
export const useGame = () => {
  const state = useGameStore();

  return {
    // State
    questions: state.questions,
    currentIndex: state.currentIndex,
    score: state.score,
    answers: state.answers,
    timeLeft: state.timeLeft,
    isAnswered: state.isAnswered,
    isFinished: state.isFinished,

    // Current question
    currentQuestion: state.getCurrentQuestion(),

    // Computed
    progress: state.getProgress(),
    formattedTime: state.getFormattedTime(),
    stats: state.getStats(),

    // Actions
    setQuestions: state.setQuestions,
    selectAnswer: state.selectAnswer,
    nextQuestion: state.nextQuestion,
    updateScore: state.updateScore,
    tickTimer: state.tickTimer,
    finishGame: state.finishGame,
    resetGame: state.resetGame,
  };
};

/**
 * Hook to select specific parts of the game state
 * Useful for optimized rendering
 */
export const useGameSelector = (selector) => {
  return useGameStore(selector);
};
