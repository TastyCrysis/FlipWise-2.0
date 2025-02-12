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
  listMode,
}) {
  let FlashcardsForList;
  let TextForZeroFlashcards;

  switch (listMode) {
    case "archive":
      FlashcardsForList = flashcards.filter((flashcard) => flashcard.isCorrect);
      TextForZeroFlashcards =
        "You have not yet answered any questions in this collection correctly.";
      break;
    default:
      FlashcardsForList = flashcards.filter(
        (flashcard) => flashcard.isCorrect === false
      );
      TextForZeroFlashcards = "There are no flashcards in this collection.";
      break;
  }

  return (
    <CardList>
      {flashcards.length === 0 ? (
        <p>All cards have been deleted.</p>
      ) : FlashcardsForList.length === 0 ? (
        <p>{TextForZeroFlashcards}</p>
      ) : (
        FlashcardsForList.map((flashcard) => {
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
