import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import Navbar from "@/components/Navbar";

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
  handleCreateFlashcard,
  handleUpdateFlashcard,
}) {
  const correctFlashcards = flashcards.filter(
    (flashcard) => flashcard.isCorrect
  );

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <h3>All Cards</h3>
      </Container>
      <ArchiveList
        flashcards={correctFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
      <Navbar handleCreateFlashcard={handleCreateFlashcard} />
    </>
  );
}
