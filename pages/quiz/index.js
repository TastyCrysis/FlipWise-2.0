import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import QuizNavbar from "@/components/QuizNavbar";

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
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
`;

const difficultyLevels = [
  { id: "easy", name: "Easy", time: 15, cards: 10 },
  { id: "medium", name: "Medium", time: 10, cards: 15 },
  { id: "hard", name: "Hard", time: 5, cards: 20 },
];

export default function QuizPage({ collections, initialValues, flashcards }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const collectionId = formData.get("collectionId");
    const difficulty = selectedDifficulty;

    // Find the selected collection
    const selectedCollection = collections.find(
      (collection) => collection._id === collectionId
    );

    if (!selectedCollection) return;

    // Find the required number of cards based on the selected difficulty
    const requiredCards = difficultyLevels.find(
      (difficultyLevel) => difficultyLevel.id === difficulty
    ).cards;

    // Get all flashcards for this collection
    const collectionFlashcards = flashcards.filter(
      (card) => card.collectionId === collectionId
    );

    // Use all existing cards regardless of isCorrect status
    let selectedCards = [...collectionFlashcards];

    // If we need more cards, generate them with AI
    if (selectedCards.length < requiredCards) {
      try {
        const cardsNeeded = requiredCards - selectedCards.length;

        const response = await fetch("/api/generate/generate-quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionTitle: selectedCollection.title,
            existingCards: collectionFlashcards,
            cardsNeeded: cardsNeeded,
            collectionId: selectedCollection._id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Failed to generate cards:", errorData);
          throw new Error("Failed to generate cards");
        }

        const generatedCards = await response.json();

        // If generated cards are successful, add them to the selected cards
        if (generatedCards && generatedCards.length > 0) {
          selectedCards = [...selectedCards, ...generatedCards];
        }
      } catch (error) {
        console.error("Error generating cards:", error);
      }
    }

    // Ensure we don't exceed required number of cards
    if (selectedCards.length > requiredCards) {
      selectedCards = selectedCards.slice(0, requiredCards);
    }

    // Shuffle all cards
    selectedCards = selectedCards.sort(() => Math.random() - 0.5);

    // Navigate to session page with selected cards
    router.push({
      pathname: "/quiz/session",
      query: {
        cards: JSON.stringify(selectedCards),
        difficulty: difficulty,
        collectionId: collectionId,
      },
    });

    setIsLoading(false);
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
            required
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
            onChange={(event) => setSelectedDifficulty(event.target.value)}
            required
          >
            <option value="">--Please select a difficulty--</option>
            {difficultyLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name} ({level.cards} cards, {level.time} minutes)
              </option>
            ))}
          </Select>
        </SelectGroup>

        <StartButton type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Start Quiz"}
        </StartButton>
      </SelectionForm>
      <QuizNavbar />
    </QuizContainer>
  );
}
