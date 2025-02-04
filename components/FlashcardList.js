import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import styled from "styled-components";
import { useState } from "react";

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Flashcard = styled.li`
  max-width: 550px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 15px 32px;
  padding: 15px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const FlashcardContent = styled.div`
  display: flex;
  flex-direction: column;
  perspective: 1000px;
`;

const FlashcardQuestion = styled.p`
  font-weight: bold;
  margin: 0;
`;

const FlashcardAnswer = styled.p`
  color: #555;
  margin: 5px 0;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #888;
  margin: 0 0 7px 0;
`;

const FlashcardFront = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const FlashcardBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

export default function FlashcardList() {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <CardList>
      {flashcards.map((flashcard) => {
        const collection = collections.find(
          (collection) => collection.id === flashcard.collectionId
        );
        return (
          <Flashcard key={flashcard.id} onClick={handleFlip}>
            <FlashcardContent flipped={flipped}>
              <CollectionTitle>{collection.title}</CollectionTitle>
              <div>
                <FlashcardFront>
                  <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
                </FlashcardFront>
                <FlashcardBack>
                  <FlashcardAnswer>{flashcard.answer}</FlashcardAnswer>
                </FlashcardBack>
              </div>
            </FlashcardContent>
          </Flashcard>
        );
      })}
    </CardList>
  );
}
