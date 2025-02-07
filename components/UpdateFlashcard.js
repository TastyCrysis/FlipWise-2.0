import FlashcardForm from "./FlashcardForm";

export default function UpdateFlashcard({ handleUpdateFlashcard }) {
  return (
    <>
      <FlashcardForm onSubmit={handleUpdateFlashcard} />;
    </>
  );
}
