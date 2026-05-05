import GrammarQuestion from "./GrammarQuestion";
import AudioQuestion from "./AudioQuestion";
import ImageQuestion from "./ImageQuestion";

export default function QuestionRenderer({
  question,
  currentIndex,
  totalQuestions,
  isAnswered,
  selectedAnswer,
  onAnswer,
}) {
  if (!question) {
    return null;
  }

  const questionType = question.type || "grammar"; // Default to grammar

  switch (questionType) {
    case "grammar":
      return (
        <GrammarQuestion
          question={question}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case "audio":
      return (
        <AudioQuestion
          question={question}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case "image":
      return (
        <ImageQuestion
          question={question}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    default:
      // Fallback to grammar for unknown types
      return (
        <GrammarQuestion
          question={question}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );
  }
}
