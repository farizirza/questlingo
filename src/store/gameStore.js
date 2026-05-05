import { create } from "zustand";

const TIMER_DURATION = 1200; // 20 minutes in seconds

export const useGameStore = create((set, get) => ({
  // State
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  timeLeft: TIMER_DURATION,
  isAnswered: false,
  isFinished: false,

  // Actions
  /**
   * Set questions and initialize game state
   */
  setQuestions: (questions) =>
    set({
      questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      timeLeft: TIMER_DURATION,
      isAnswered: false,
      isFinished: false,
    }),

  /**
   * Select an answer for current question
   * Locks the answer immediately and updates score
   */
  selectAnswer: (selectedAnswer) => {
    const state = get();
    if (state.isAnswered || state.isFinished) return;

    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    const newScore = isCorrect ? state.score + 1 : state.score;

    const newAnswers = [
      ...state.answers,
      {
        questionId: currentQuestion.id,
        selected: selectedAnswer,
        correct: currentQuestion.answer,
        isCorrect,
      },
    ];

    set({
      isAnswered: true,
      score: newScore,
      answers: newAnswers,
    });

    // Auto-advance to next question after 1.5 seconds
    setTimeout(() => {
      const updatedState = get();
      if (!updatedState.isFinished) {
        get().nextQuestion();
      }
    }, 1500);
  },

  /**
   * Move to next question
   * Auto-finishes game if no more questions
   */
  nextQuestion: () => {
    const state = get();
    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.questions.length) {
      set({ isFinished: true });
    } else {
      set({
        currentIndex: nextIndex,
        isAnswered: false,
      });
    }
  },

  /**
   * Manually update score (if needed for special cases)
   */
  updateScore: (points) => {
    const state = get();
    set({ score: state.score + points });
  },

  /**
   * Decrement timer by 1 second
   * Auto-finishes game if time runs out
   */
  tickTimer: () => {
    const state = get();
    if (state.isFinished) return;

    const newTime = Math.max(0, state.timeLeft - 1);

    if (newTime === 0) {
      set({ timeLeft: 0, isFinished: true });
    } else {
      set({ timeLeft: newTime });
    }
  },

  /**
   * Immediately finish the game
   */
  finishGame: () => {
    set({ isFinished: true });
  },

  /**
   * Reset game to initial state
   */
  resetGame: () =>
    set({
      questions: [],
      currentIndex: 0,
      score: 0,
      answers: [],
      timeLeft: TIMER_DURATION,
      isAnswered: false,
      isFinished: false,
    }),

  // Selectors (computed values)
  /**
   * Get current question
   */
  getCurrentQuestion: () => {
    const state = get();
    return state.questions[state.currentIndex] || null;
  },

  /**
   * Get progress as percentage
   */
  getProgress: () => {
    const state = get();
    if (state.questions.length === 0) return 0;
    return Math.round(
      ((state.currentIndex + 1) / state.questions.length) * 100,
    );
  },

  /**
   * Get formatted time string (MM:SS)
   */
  getFormattedTime: () => {
    const state = get();
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  },

  /**
   * Get game statistics
   */
  getStats: () => {
    const state = get();
    const totalQuestions = state.questions.length;
    const correctAnswers = state.answers.filter((a) => a.isCorrect).length;
    const accuracy =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      score: state.score,
      accuracy,
      timeSpent: TIMER_DURATION - state.timeLeft,
    };
  },
}));
