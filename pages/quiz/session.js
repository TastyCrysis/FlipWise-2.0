import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import QuizFlashcard from "@/components/Flashcards/QuizFlashcard";

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 24px auto;
  padding: 0 24px;
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 24px;
  background: ${({ theme, $timeWarning }) =>
    $timeWarning ? theme.warning : theme.primary};
  color: white;
  border-radius: 8px;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 72px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  width: 60%;
`;

const StyledDialog = styled.dialog`
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.modalText};
  border: 1px solid ${({ theme }) => theme.modalBorder};
  width: 380px;
  margin: 120px 12px 0 536px;
  padding: 0 12px 12px 12px;
  z-index: 10;
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

// Define difficulty levels
const difficultyLevels = [
  { id: "easy", name: "Easy", time: 15, cards: 10 },
  { id: "medium", name: "Medium", time: 10, cards: 15 },
  { id: "hard", name: "Hard", time: 7, cards: 20 },
];

export default function QuizSession({
  collection,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const router = useRouter();
  const { cards: cardsJson, difficulty: difficultyId } = router.query;

  // Parse cardsJson properly
  const parsedCards = cardsJson ? JSON.parse(cardsJson) : [];

  // Find the corresponding difficulty object
  const difficulty = difficultyLevels.find(
    (difficultyLevel) => difficultyLevel.id === difficultyId
  );

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficulty?.time * 60 || 0);
  const [quizResults, setQuizResults] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Format time helper function
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function handleQuizEnd(finalResults) {
    router.push({
      pathname: "/quiz/statistics",
      query: {
        results: JSON.stringify(finalResults || quizResults),
        timeSpent: difficulty.time * 60 - timeLeft,
        totalQuizCards: parsedCards.length,
      },
    });
  }

  function handleCardAnswer(answer) {
    const newResult = {
      cardId: currentCard._id || currentCard.id,
      question: currentCard.question,
      answer: currentCard.answer,
      right: answer === "correct",
      wrong: answer === "wrong",
    };

    // Update quiz results
    const newResults = [...quizResults, newResult];

    // Always update results first
    setQuizResults(newResults);

    // Then handle navigation or next card
    if (currentCardIndex === parsedCards.length - 1) {
      // On last card, use the newResults directly
      handleQuizEnd(newResults);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  // Check if cards are available
  if (!parsedCards || parsedCards.length === 0) {
    return <div>No cards available</div>;
  }

  // Get current card
  const currentCard = parsedCards[currentCardIndex];

  function toggleConfirmation() {
    setShowConfirmation(!showConfirmation);
  }

  function handleCancelQuiz() {
    router.push("/quiz");
  }

  return (
    <SessionContainer>
      <Timer $timeWarning={timeLeft < 20}>{formatTime(timeLeft)}</Timer>
      {currentCard && (
        <QuizFlashcard
          flashcard={currentCard}
          key={currentCard._id}
          collection={collection}
          collections={collections}
          handleToggleCorrect={handleToggleCorrect}
          handleDeleteFlashcard={handleDeleteFlashcard}
          handleUpdateFlashcard={handleUpdateFlashcard}
          onAnswer={handleCardAnswer}
        />
      )}
      <Button onClick={toggleConfirmation}>Cancel Quiz</Button>
      <StyledDialog open={showConfirmation}>
        <h3>Do you really want to cancel the quiz?</h3>
        <ConfirmButtonContainer>
          <Button onClick={handleCancelQuiz}>Confirm</Button>
          <Button onClick={toggleConfirmation}>Cancel</Button>
        </ConfirmButtonContainer>
      </StyledDialog>
    </SessionContainer>
  );
}
