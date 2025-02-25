import { useState } from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  max-width: 600px;
  margin: 48px auto;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 32px;
  text-align: center;
`;

const SelectionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.border};
  font-size: 1.1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const StartButton = styled.button`
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

const difficultyLevels = [
  { id: "easy", name: "Easy", time: 15, cards: 10 },
  { id: "medium", name: "Medium", time: 10, cards: 15 },
  { id: "hard", name: "Hard", time: 5, cards: 20 },
];

export default function QuizPage({ collections }) {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: Check if collection has enough cards
    // If not, generate additional cards using AI
    // Navigate to /quiz/session with selected parameters
  };

  return (
    <QuizContainer>
      <Title>Start a New Quiz</Title>
      <SelectionForm onSubmit={handleSubmit}>
        <SelectGroup>
          <Label htmlFor="collection">Select Collection</Label>
          <Select
            id="collection"
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            required
          >
            <option value="">Choose a collection...</option>
            {collections?.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </Select>
        </SelectGroup>

        <SelectGroup>
          <Label htmlFor="difficulty">Select Difficulty</Label>
          <Select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            required
          >
            <option value="">Choose difficulty...</option>
            {difficultyLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name} ({level.cards} cards, {level.time} minutes)
              </option>
            ))}
          </Select>
        </SelectGroup>

        <StartButton
          type="submit"
          disabled={!selectedCollection || !selectedDifficulty}
        >
          Start Quiz
        </StartButton>
      </SelectionForm>
    </QuizContainer>
  );
}
