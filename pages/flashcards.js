import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";
import CreateFlashcard from "@/components/CreateFlashcard";
import { useRouter } from "next/router";

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
        <h2>{currentCollection ? currentCollection.title : ""}</h2>
        <Link href="/archive">Archive</Link>
      </Container>
      <CreateFlashcard
        handleCreateFlashcard={handleCreateFlashcard}
        collectionId={collectionId}
      />
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </>
  );
}
