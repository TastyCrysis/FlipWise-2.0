import FlashcardForm from "./FlashcardForm";

export default function UpdateFlashcard({ handleUpdateFlashcard, flashcard }) {
  return (
    <>
      <FlashcardForm
        title="Update Flashcard"
        onSubmit={handleUpdateFlashcard}
        initialValues={{
          question: flashcard?.question || "",
          answer: flashcard?.answer || "",
          collectionId: flashcard?.collectionId || "",
          id: flashcard?.id || "",
        }}
      />
      ;
    </>
  );
}
