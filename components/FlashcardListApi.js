import styled from "styled-components";
import Flashcard from "@/components/Flashcard";
import useSWR from "swr";

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
  const { data, isLoading } = useSWR("/api/flashcards");
  const { collectionsData, isLoading2 } = useSWR("/api/collections");
  console.log("data_", data);
  //console.log("data[0]_", data[0].isCorrect);
  console.log("flashcards_", flashcards);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  const unansweredFlashcards = data.filter(
    (flashcard) => flashcard.isCorrect === false
  );
  console.log("unansweredFlashcards_", unansweredFlashcards);
  return (
    <CardList>
      {data.length === 0 ? (
        <p>All cards have been deleted.</p>
      ) : unansweredFlashcards.length === 0 ? (
        <p>There are no flashcards in this collection.</p>
      ) : (
        unansweredFlashcards.map((flashcard) => {
          const collection = collectionsData.find(
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
