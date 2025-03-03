import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 4px;
  margin-top: 12px;
`;

const StyledCollectionTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 6px;
`;

export default function Homepage({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>Loading...</div>;
  }

  const filteredFlashcards = flashcards.filter(
    (flashcard) => flashcard.collectionId === id && !flashcard.isCorrect
  );
  const currentCollection = collections.find(
    (collection) => collection._id === id
  );

  return (
    <>
      <Container>
        <StyledPageTitle>List of flashcards</StyledPageTitle>
      </Container>
      <StyledCollectionTitle>
        {currentCollection && currentCollection.title}
      </StyledCollectionTitle>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
