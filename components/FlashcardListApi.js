import styled from "styled-components";
import Flashcard from "@/components/Flashcard";

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
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const unansweredFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect === false
  );

  return (
    <CardList>
      {flashcards.length === 0 ? (
        <p>All cards have been deleted.</p>
      ) : unansweredFlashcards.length === 0 ? (
        <p>There are no flashcards in this collection.</p>
      ) : (
        unansweredFlashcards.map((flashcard) => {
          const collection = collections.find(
            (collection) => collection.id === flashcard.collectionId
          );
          return (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              collection={collection}
              handleToggleCorrect={handleToggleCorrect}
              handleDeleteFlashcard={handleDeleteFlashcard}
              handleUpdateFlashcard={handleUpdateFlashcard}
            />
          );
        })
      )}
    </CardList>
  );
}
