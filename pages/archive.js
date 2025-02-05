import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function archive({
  flashcards,
  collections,
  handleToggleCorrect,
}) {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <Link href="/">Home</Link>
      </Container>
      <ArchiveList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
      />
    </>
  );
}
