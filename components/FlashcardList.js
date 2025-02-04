import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import React, { useState } from "react";
import styled from "styled-components";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

const Flashcard = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
  max-width: 550px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 15px auto;
  padding: 15px;
`;

const FlashcardFront = styled.div`
  background: #ff6f61;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0px;
  right: 0px;
  z-index: 2;
  display: flex;
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
  right: 0px;
  top: 0px;
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
  z-index: 3;
`;

export default function FlashcardList() {
  return (
    <CardList>
      {flashcards.map((flashcard) => {
        const collection = collections.find(
          (collection) => collection.id === flashcard.collectionId
        );

        const [flipped, setFlipped] = useState(false);

        const handleFlip = () => {
          setFlipped(!flipped);
        };

        return (
          <Flashcard flipped={flipped} onClick={handleFlip}>
            <CollectionTitle>{collection.title}</CollectionTitle>
            <FlashcardFront>
              <FlashcardContent>
                <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
              </FlashcardContent>
            </FlashcardFront>
            <FlashcardBack>
              <FlashcardContent>
                <FlashcardAnswer>
                  <b>Antwort:</b>
                </FlashcardAnswer>
                <FlashcardAnswer>{flashcard.answer}</FlashcardAnswer>
              </FlashcardContent>
            </FlashcardBack>
          </Flashcard>
        );
      })}
    </CardList>
  );
}
