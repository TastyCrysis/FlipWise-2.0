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

export default function FlashcardList({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  return (
    <CardList>
      {flashcards.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        flashcards.map((flashcard) => {
          const collection = collections.find(
            (collection) => collection._id === flashcard.collectionId
          );
          return (
            <Flashcard
              key={flashcard._id}
              flashcard={flashcard}
              collection={collection}
              collections={collections}
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
