import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Archive({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
}) {
  const router = useRouter();
  const { collectionId } = router.query;
  const filteredFlashcards = collectionId
    ? flashcards.filter((flashcard) => flashcard.collectionId === collectionId)
    : flashcards;
  const currentCollection = collections.find(
    (collection) => collection.id === collectionId
  );
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <h3>{currentCollection ? currentCollection.title : ""}</h3>
        <Link href="/">Home</Link>
      </Container>
      <ArchiveList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </>
  );
}
