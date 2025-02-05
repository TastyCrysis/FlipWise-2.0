import { flashcards as initialFlashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import styled from "styled-components";
import Flashcard from "@/components/Flashcard";
import { useHandleCorrect } from "@/hooks/useHandleCorrect";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function FlashcardList() {
  const { flashcards, toggleCorrect } = useHandleCorrect(initialFlashcards);
  const correctFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect
  );

  return (
    <CardList>
      {correctFlashcards.length === 0 ? (
        <p>
          You have not yet answered any questions in this collection correctly.
        </p>
      ) : (
        correctFlashcards.map((flashcard) => {
          const collection = collections.find(
            (collection) => collection.id === flashcard.collectionId
          );
          return (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              collection={collection}
              toggleCorrect={toggleCorrect}
            />
          );
        })
      )}
    </CardList>
  );
}
