import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Homepage({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>Loading...</div>;
  }

  const filteredFlashcards = flashcards.filter(
    (flashcard) => flashcard.collectionId === id
  );
  const currentCollection = collections.find(
    (collection) => collection._id === id
  );

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>List of flashcards</h2>
        <h3>{currentCollection && currentCollection.title}</h3>
      </Container>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
