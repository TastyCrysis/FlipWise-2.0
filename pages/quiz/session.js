import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const SessionContainer = styled.div`
  max-width: 800px;
  margin: 24px auto;
  padding: 0 24px;
`;

const Timer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 12px 24px;
  background: ${({ theme, timeWarning }) =>
    timeWarning ? theme.warning : theme.primary};
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Card = styled.div`
  perspective: 1000px;
  margin: 48px auto;
  width: 100%;
  height: 400px;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? "rotateY(180deg)" : "none")};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  flex-direction: column;
  gap: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
`;

const CorrectButton = styled(Button)`
  background: ${({ theme }) => theme.success};
  color: white;
  &:hover {
    background: ${({ theme }) => theme.successHover};
  }
`;

const IncorrectButton = styled(Button)`
  background: ${({ theme }) => theme.error};
  color: white;
  &:hover {
    background: ${({ theme }) => theme.errorHover};
  }
`;

export default function QuizSession({ cards, difficulty }) {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(difficulty.time * 60); // Convert minutes to seconds
  const [results, setResults] = useState([]);

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

  const handleCardAnswer = (isCorrect) => {
    setResults([
      ...results,
      {
        cardId: cards[currentCardIndex].id,
        isCorrect,
      },
    ]);

    if (currentCardIndex + 1 >= cards.length) {
      handleQuizEnd();
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleQuizEnd = () => {
    // Navigate to statistics page with results
    router.push({
      pathname: "/quiz/statistics",
      query: {
        results: JSON.stringify(results),
        timeSpent: difficulty.time * 60 - timeLeft,
      },
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!cards || cards.length === 0) {
    return <div>No cards available</div>;
  }

  const currentCard = cards[currentCardIndex];

  return (
    <SessionContainer>
      <Timer timeWarning={timeLeft < 60}>Time: {formatTime(timeLeft)}</Timer>

      <Card>
        <CardInner isFlipped={isFlipped}>
          <CardSide onClick={() => setIsFlipped(true)}>
            {currentCard.question}
          </CardSide>
          <CardBack>
            {currentCard.answer}
            <ButtonGroup>
              <CorrectButton onClick={() => handleCardAnswer(true)}>
                Correct
              </CorrectButton>
              <IncorrectButton onClick={() => handleCardAnswer(false)}>
                Incorrect
              </IncorrectButton>
            </ButtonGroup>
          </CardBack>
        </CardInner>
      </Card>
    </SessionContainer>
  );
}
