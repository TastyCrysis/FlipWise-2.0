import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
}) {
  const router = useRouter();

  // Warten bis Router bereit ist
  /*  if (!router.isReady) {
    return <div>Loading...</div>;
  } */

  const { id } = router.query;

  // Finde die aktuelle Collection
  const currentCollection = collections.find(
    (collection) => collection.id === (id ? String(id) : null)
  );

  // Filtere die Flashcards
  const filteredFlashcards = currentCollection
    ? flashcards.filter(
        (flashcard) => flashcard.collectionId === currentCollection.id
      )
    : flashcards;

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <h3>{currentCollection ? currentCollection.title : "All Cards"}</h3>
        <Link href="/">Home</Link>
      </Container>
      <ArchiveList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
      <Navbar />
    </>
  );
}
