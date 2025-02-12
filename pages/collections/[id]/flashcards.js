import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const Container = styled.header`
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
  handleUpdateFlashcard,
}) {
  const router = useRouter();
  const { id } = router.query;
  const filteredFlashcards = id
    ? flashcards.filter((flashcard) => flashcard.collectionId === id)
    : flashcards;
  const currentCollection = collections.find(
    (collection) => collection.id === id
  );

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>List of flashcards</h2>
        <h3>{currentCollection && currentCollection.title}</h3>
        <Link href="/">Collections list</Link>
        {currentCollection && (
          <Link href={`/collections/${currentCollection.id}/archive`}>
            Archive
          </Link>
        )}
      </Container>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
      <Navbar handleCreateFlashcard={handleCreateFlashcard} />
    </>
  );
}
