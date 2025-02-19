import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const { id } = router.query;

  // Finde die aktuelle Collection
  const currentCollection = collections.find(
    (collection) => collection._id === (id ? String(id) : null)
  );

  // Filtere die Flashcards
  const filteredFlashcards = currentCollection
    ? flashcards.filter(
        (flashcard) => flashcard.collectionId === currentCollection._id
      )
    : flashcards;

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <h3>{currentCollection ? currentCollection.title : "All Cards"}</h3>
      </Container>
      <ArchiveList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
