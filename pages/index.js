import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";
import FlashcardForm from "@/components/FlashcardForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Homepage({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleCreateFlashcard,
}) {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <Link href="/archive">Archive</Link>
      </Container>
      <FlashcardForm
        onSubmit={handleCreateFlashcard}
        title="Create a new Flashcard"
      />
      <FlashcardList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </>
  );
}
