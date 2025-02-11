import styled from "styled-components";
import Link from "next/link";
import FlashcardForm from "@/components/FlashcardForm";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Edit({ handleUpdateFlashcard, flashcards }) {
  const router = useRouter();
  const { cardId } = router.query;
  const flashcard = flashcards.find((flashcard) => flashcard.id === cardId);

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <Link href="/">Home</Link>
      </Container>
      <FlashcardForm
        title="Update Flashcard"
        onSubmit={handleUpdateFlashcard}
        initialValues={{
          id: flashcard?.id || "",
          collectionId: flashcard?.collectionId || "",
          question: flashcard?.question || "",
          answer: flashcard?.answer || "",
          isCorrect: flashcard?.isCorrect || false,
        }}
      />
    </>
  );
}
