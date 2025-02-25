import styled from "styled-components";
import Flashcard from "@/components/Flashcards/Flashcard";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function ArchiveList({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const correctFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect
  );

  return (
    <CardList>
      {flashcards.length === 0 ? (
        <p>All cards have been deleted.</p>
      ) : correctFlashcards.length === 0 ? (
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
