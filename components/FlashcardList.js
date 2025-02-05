import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import styled from "styled-components";
import Flashcard from "@/components/Flashcard";
import { useState } from "react";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function FlashcardList() {
  const [isCorrect, setIsCorrect] = useState(false);
  const notEditFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect === false
  );

  function handleCorrect(id) {
    const flashcard = flashcards.find((flashcard) => flashcard.id === id);
    if (flashcard) {
      flashcard.isCorrect = true;
      setIsCorrect(!isCorrect);
    }
  }

  return (
    <CardList>
      {notEditFlashcards.length === 0 ? (
        <p>
          You have already answered all the questions in this collection
          correctly.
        </p>
      ) : (
        notEditFlashcards.map((flashcard) => {
          const collection = collections.find(
            (collection) => collection.id === flashcard.collectionId
          );
          return (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              collection={collection}
              handleCorrect={handleCorrect}
            />
          );
        })
      )}
    </CardList>
  );
}
