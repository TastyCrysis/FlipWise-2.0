import styled from "styled-components";
import Flashcard from "@/components/Currywurst";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function FlashcardList({
  flashcards,
  collections,
  handleToggleCorrect,
}) {
  const notEditFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect === false
  );

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
              handleToggleCorrect={handleToggleCorrect}
            />
          );
        })
      )}
    </CardList>
  );
}
