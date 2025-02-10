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

export default function CollectionList({ flashcards, collections }) {
  const unansweredFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect === false
  );
  const correctFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect
  );

  return (
    <CardList>
      {collections.length === 0 ? (
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
            />
          );
        })
      )}
    </CardList>
  );
}
