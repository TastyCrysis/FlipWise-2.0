import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Archive({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const listMode = "archive";

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <h3>All Cards</h3>
      </Container>
      <FlashcardList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
        listMode={listMode}
      />
    </>
  );
}
