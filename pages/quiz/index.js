import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import QuizNavbar from "@/components/QuizNavbar";
import Image from "next/image";

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

const TooltipText = styled.ol`
  visibility: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.tooltipBackground};
  color: ${({ theme }) => theme.tooltipText};
  border: 1px solid ${({ theme }) => theme.tooltipBorder};
  min-width: 300px;
  max-width: 90vw;
  text-align: left;
  padding: 8px 8px 8px 24px;
  border-radius: 8px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme }) => theme.tooltipBackground} transparent;
    filter: drop-shadow(0 -1px 0 ${({ theme }) => theme.tooltipBorder});
  }
`;

const Icon = styled.span`
  position: relative;
  display: block;
  line-height: 1;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: ${({ theme }) => theme.navbarText};

  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "invert(1)"};
  }
`;

const TooltipContainer = styled.div`
  position: relative;
  cursor: help;
  line-height: 1.2em;
  margin: 0;

  &:hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

const List = styled.ol`
  padding-left: 2px;
  padding-right: 2px;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 4px;
  line-height: 1.2;

  &:last-child {
    margin-bottom: 0;
  }
`;

const difficultyLevels = [
  { id: "easy", name: "Easy", time: 15, cards: 10 },
  { id: "medium", name: "Medium", time: 10, cards: 15 },
  { id: "hard", name: "Hard", time: 7, cards: 20 },
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

    // save data to localStorage
    localStorage.setItem("quizCards", JSON.stringify(selectedCards));
    localStorage.setItem("quizDifficulty", difficulty);
    localStorage.setItem("quizCollectionId", collectionId);

    router.push("/quiz/session");

    setIsLoading(false);
  }

  return (
    <QuizContainer>
      <Title>Start a New Quiz</Title>
      <TooltipContainer>
        <Icon>
          <Image src="/asset/info.png" alt="info-logo" width={24} height={24} />
        </Icon>
        <TooltipText>
          <List>
            <ListItem>
              Select a collection and a difficulty to start a new quiz.
            </ListItem>
            <hr />
            <ListItem>
              If selected collection has less flashcards than the required
              number of cards, AI will generate the missing cards.
            </ListItem>
            <hr />
            <ListItem>
              If the vercel serverless timeout is reached, the flashcards will
              not be generated. Try again.
            </ListItem>
          </List>
        </TooltipText>
      </TooltipContainer>
      <SelectionForm onSubmit={handleSubmit}>
        <SelectGroup>
          <Label htmlFor="collection">Select Collection</Label>
          <Select
            name="collectionId"
            id="collection"
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
            defaultValue=""
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
