import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const QuizContainer = styled.div`
  max-width: 600px;
  margin: 48px auto;
  padding: 0 24px;
`;

const Title = styled.h2`
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

export default function QuizPage({
  collections,
  initialValues,
  handleCreateAiQuizFlashcards,
}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const collectionId = formData.get("collectionId");
    const difficulty = selectedDifficulty;

    // Find the selected collection
    const selectedCollection = collections.find(
      (collection) => collection._id === collectionId
    );
    // Find the required number of cards based on the selected difficulty
    const requiredCards = difficultyLevels.find(
      (difficultyLevel) => difficultyLevel.id === difficulty
    ).cards;

    // Use all existing cards regardless of isCorrect status
    let selectedCards = [];
    if (selectedCollection.flashcards) {
      // Take all existing cards first
      selectedCards = [...selectedCollection.flashcards];

      // If we need more cards, generate them with AI
      if (selectedCards.length < requiredCards) {
        try {
          // Calculate how many additional cards we need
          const additionalCardsNeeded = requiredCards - selectedCards.length;

          // Format collection for AI generation
          const collectionFormatted = {
            _id: selectedCollection._id,
            title: selectedCollection.title,
            cards: selectedCollection.flashcards,
          };

          // Generate only the needed number of additional cards
          const generatedCards = await handleCreateAiQuizFlashcards(
            collectionFormatted,
            additionalCardsNeeded
          );

          // Add generated cards to selected cards
          selectedCards = [...selectedCards, ...(generatedCards || [])];

          // Ensure we don't exceed required number of cards
          selectedCards = selectedCards.slice(0, requiredCards);
        } catch (error) {
          console.error("Error generating cards:", error);
        }
      }

      // Shuffle all cards
      selectedCards = selectedCards.sort(() => Math.random() - 0.5);
    } else {
      console.error("No flashcards found in collection");
      return;
    }

    // Navigate to session page with selected cards
    router.push({
      pathname: "/quiz/session",
      query: {
        cards: JSON.stringify(selectedCards),
        difficulty: difficulty,
        collectionId: collectionId,
      },
    });
  }

  return (
    <QuizContainer>
      <Title>Start a New Quiz</Title>
      <SelectionForm onSubmit={handleSubmit}>
        <SelectGroup>
          <Label htmlFor="collection">Select Collection</Label>
          <Select
            name="collectionId"
            id="collections-select"
            defaultValue={initialValues?.collectionId || ""}
          >
            <option value="" disabled>
              --Please select a collection--
            </option>
            {collections &&
              collections.length > 0 &&
              collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
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

        <StartButton type="submit" disabled={!selectedDifficulty}>
          Start Quiz
        </StartButton>
      </SelectionForm>
    </QuizContainer>
  );
}
