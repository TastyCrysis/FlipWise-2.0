import { useState } from "react";
import styled from "styled-components";

const StyledFlashcard = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0)")};
  max-width: 550px;
  margin: 15px auto;
  cursor: pointer;
`;

const FlashcardFront = styled.div`
  background: #ff6f61;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const FlashcardBack = styled.div`
  background: #6fb3ff;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const FlashcardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlashcardQuestion = styled.p`
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const FlashcardAnswer = styled.p`
  color: #000;
  margin: 5px 0;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #000;
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  backface-visibility: hidden;
  will-change: transform;
  z-index: 10;
  transform: rotateY(0deg);
`;

const StyledDialog = styled.dialog`
  padding: 16px;
  border: solid 1px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  will-change: transform;
  backface-visibility: hidden;
`;

export default function Flashcard({ flashcards, collection }) {
  const unansweredFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect === false
  );
  const correctFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect
  );
  return (
    <StyledFlashcard key={collection.id}>
      <CollectionTitle>{collection.title}</CollectionTitle>
      <FlashcardFront>
        <p>unansweredFlashcards: '$correctFlashcards'</p>
        <p>correctFlashcards</p>
      </FlashcardFront>
    </StyledFlashcard>
  );
}
