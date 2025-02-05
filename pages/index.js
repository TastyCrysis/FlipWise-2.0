import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Homepage({
  flashcards,
  collections,
  handleToggleCorrect,
}) {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <Link href="/archive">Archive</Link>
      </Container>
      <FlashcardList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
      />
    </>
  );
}
