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
  margin: 120px 12px 0 0;
  margin-left: 50%;
  transform: translateX(-50%);
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

  // Zustandsvariablen
  const [parsedCards, setParsedCards] = useState([]);
  const [difficultyId, setDifficultyId] = useState("");
  const [quizResults, setQuizResults] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // load data from localStorage
  useEffect(() => {
    const storedCards = localStorage.getItem("quizCards");
    const storedDifficulty = localStorage.getItem("quizDifficulty");

    // if data is available, set the state
    if (storedCards && storedDifficulty) {
      const cards = JSON.parse(storedCards);
      setParsedCards(cards);
      setDifficultyId(storedDifficulty);

      // set timer based on difficulty
      const difficultyLevel = difficultyLevels.find(
        (level) => level.id === storedDifficulty
      );
      if (difficultyLevel) {
        setTimeLeft(difficultyLevel.time * 60);
      }
    } else {
      // if no data is available, go back to quiz start page
      router.push("/quiz");
    }
  }, [router]);

  // timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

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

  // format time helper function
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function handleCardAnswer(answer) {
    if (
      !parsedCards ||
      parsedCards.length === 0 ||
      currentCardIndex >= parsedCards.length
    ) {
      return;
    }

    // get current card
    const currentCard = parsedCards[currentCardIndex];

    // create new result
    const newResult = {
      cardId: currentCard._id || currentCard.id,
      question: currentCard.question,
      answer: currentCard.answer,
      right: answer === "correct",
      wrong: answer === "wrong",
    };

    // Update quiz results
    const newResults = [...quizResults, newResult];

    // then handle navigation or next card
    if (currentCardIndex === parsedCards.length - 1) {
      // save results to localStorage for statistics page
      localStorage.setItem("quizResults", JSON.stringify(newResults));
      localStorage.setItem(
        "quizTimeSpent",
        (
          difficultyLevels.find((level) => level.id === difficultyId)?.time *
            60 -
          timeLeft
        ).toString()
      );
      localStorage.setItem("quizTotalCards", parsedCards.length.toString());

      // navigate to statistics page
      router.push("/quiz/statistics");
    } else {
      // update state and go to next card
      setQuizResults(newResults);
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }

  function toggleConfirmation() {
    setShowConfirmation(!showConfirmation);
  }

  function handleCancelQuiz() {
    // delete quiz data from localStorage
    localStorage.removeItem("quizCards");
    localStorage.removeItem("quizDifficulty");
    localStorage.removeItem("quizCollectionId");
    localStorage.removeItem("quizResults");

    router.push("/quiz/statistics");
  }

  // get current card
  const currentCard = parsedCards[currentCardIndex];

  return (
    <SessionContainer>
      <Timer $timeWarning={timeLeft < 20}>{formatTime(timeLeft)}</Timer>
      {currentCard && (
        <QuizFlashcard
          flashcard={currentCard}
          key={currentCard._id || currentCard.id}
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
