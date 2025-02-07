import styled from "styled-components";
import Link from "next/link";
import UpdateFlashcard from "@/components/UpdateFlashcard";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Edit({ handleUpdateFlashcard, flashcards }) {
  const router = useRouter();
  const { id } = router.query;
  const flashcard = flashcards.find(function (flashcard) {
    return flashcard.id === id;
  });
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <Link href="/">Home</Link>
      </Container>
      <UpdateFlashcard
        handleUpdateFlashcard={handleUpdateFlashcard}
        flashcard={flashcard}
      />
    </>
  );
}
