import { flashcards } from "@/lib/db/flashcards";
import FlashcardForm from "./FlashcardForm";

export default function UpdateFlashcard({ handleUpdateFlashcard, flashcard }) {
  return (
    <>
      <FlashcardForm
        onSubmit={handleUpdateFlashcard}
        initialValues={{
          question: flashcard?.question || "huhu",
          answer: flashcard?.answer || "haha",
          collectionId: flashcard?.collectionId || "",
          id: flashcard?.id || "",
        }}
      />
      ;
    </>
  );
}
