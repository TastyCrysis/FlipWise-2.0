import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";

const StatsContainer = styled.div`
  max-width: 800px;
  margin: 48px auto;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 32px;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme, type }) => {
    switch (type) {
      case "correct":
        return theme.success;
      case "incorrect":
        return theme.error;
      default:
        return theme.primary;
    }
  }};
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 8px;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export default function QuizStatistics() {
  const router = useRouter();
  const { results: resultsString, timeSpent, totalQuizCards } = router.query;

  // Parse results from query string
  const results = resultsString ? JSON.parse(resultsString) : [];
  console.log("Quiz results received:", results);

  // Calculate statistics
  const answeredCards = results.length;
  const totalCards = totalQuizCards ? parseInt(totalQuizCards) : answeredCards;

  // Count right and wrong answers
  const correctAnswers = results.filter((result) => result.right).length;
  const incorrectAnswers = results.filter((result) => result.wrong).length;

  console.log("Statistics:", {
    totalCards,
    answeredCards,
    correctAnswers,
    incorrectAnswers,
  });

  // Calculate accuracy
  const accuracy =
    answeredCards > 0 ? ((correctAnswers / answeredCards) * 100).toFixed(1) : 0;

  // Format time spent
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleReturnToQuiz = () => {
    router.push("/quiz");
  };

  return (
    <StatsContainer>
      <Title>Quiz Results</Title>

      <StatsGrid>
        <StatCard>
          <StatValue>{totalCards}</StatValue>
          <StatLabel>Total Cards</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{answeredCards}</StatValue>
          <StatLabel>Questions Answered</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue type="correct">{correctAnswers}</StatValue>
          <StatLabel>Correct Answers</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue type="incorrect">{incorrectAnswers}</StatValue>
          <StatLabel>Incorrect Answers</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{accuracy}%</StatValue>
          <StatLabel>Accuracy</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{formatTime(Number(timeSpent) + 1)}</StatValue>
          <StatLabel>Time Spent</StatLabel>
        </StatCard>
      </StatsGrid>

      <Button onClick={handleReturnToQuiz}>Start New Quiz</Button>
    </StatsContainer>
  );
}
