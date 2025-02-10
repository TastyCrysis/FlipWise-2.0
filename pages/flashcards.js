import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";
import CreateFlashcard from "@/components/CreateFlashcard";

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
      <CreateFlashcard handleCreateFlashcard={handleCreateFlashcard} />
      <FlashcardList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </>
  );
}
