import { flashcards } from "@/lib/db/flashcards";
import FlashcardForm from "./FlashcardForm";

export default function UpdateFlashcard({ handleUpdateFlashcard }) {
  return (
    <>
      <FlashcardForm
        onSubmit={handleUpdateFlashcard}
        initialValues={{
          question: flashcard.question,
          answer: flashcard.answer,
          collectionId: flashcard.collectionId,
        }}
      />
      ;
    </>
  );
}
