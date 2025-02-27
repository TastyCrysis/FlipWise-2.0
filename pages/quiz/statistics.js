import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import QuizNavbar from "@/components/QuizNavbar";

const StatsContainer = styled.div`
  max-width: 800px;
  margin: 48px auto;
  padding: 0 24px;
`;

const Title = styled.h2`
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
        return theme.right;
      case "incorrect":
        return theme.wrong;
      default:
        return theme.modalText;
    }
  }};
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 8px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0 auto;
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

export default function QuizStatistics() {
  const router = useRouter();
  const { r, t, c } = router.query;
  const [results, setResults] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [totalQuizCards, setTotalQuizCards] = useState(0);
  const dataLoaded = useRef(false);

  useEffect(() => {
    // avoid multiple executions
    if (dataLoaded.current) {
      return;
    }

    if (r && t && c) {
      try {
        // decode base64 encoded results
        const decodedResults = JSON.parse(decodeURIComponent(atob(r)));
        setResults(decodedResults);
        setTimeSpent(parseInt(t));
        setTotalQuizCards(parseInt(c));
        dataLoaded.current = true;
      } catch (error) {
        checkLocalStorage();
      }
    } else {
      checkLocalStorage();
    }

    function checkLocalStorage() {
      // load data from localStorage
      const storedResults = localStorage.getItem("quizResults");
      const storedTimeSpent = localStorage.getItem("quizTimeSpent");
      const storedTotalCards = localStorage.getItem("quizTotalCards");

      // if data is available, set the state
      if (storedResults && storedTimeSpent && storedTotalCards) {
        setResults(JSON.parse(storedResults));
        setTimeSpent(parseInt(storedTimeSpent));
        setTotalQuizCards(parseInt(storedTotalCards));

        // delete data from localStorage
        localStorage.removeItem("quizCards");
        localStorage.removeItem("quizDifficulty");
        localStorage.removeItem("quizCollectionId");
        localStorage.removeItem("quizResults");
        localStorage.removeItem("quizTimeSpent");
        localStorage.removeItem("quizTotalCards");

        dataLoaded.current = true;
      } else if (!dataLoaded.current) {
        router.push("/quiz");
      }
    }
  }, [r, t, c, router]);

  // Calculate statistics
  const answeredCards = results.length;
  const totalCards = totalQuizCards || answeredCards;

  // Count right and wrong answers
  const correctAnswers = results.filter((result) => result.right).length;
  const incorrectAnswers = results.filter((result) => result.wrong).length;

  // Calculate accuracy
  const accuracy =
    answeredCards > 0 ? ((correctAnswers / answeredCards) * 100).toFixed(1) : 0;

  // Format time spent
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  return (
    <StatsContainer>
      <Title>Quiz Results</Title>

      <StatsGrid>
        <StatCard>
          <StatValue type="correct">{correctAnswers}</StatValue>
          <StatLabel>Correct Answers</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue type="incorrect">{incorrectAnswers}</StatValue>
          <StatLabel>Incorrect Answers</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{totalCards}</StatValue>
          <StatLabel>Total Cards</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{answeredCards}</StatValue>
          <StatLabel>Questions Answered</StatLabel>
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

      <StyledLink href="/quiz">Start New Quiz</StyledLink>
      <QuizNavbar />
    </StatsContainer>
  );
}
