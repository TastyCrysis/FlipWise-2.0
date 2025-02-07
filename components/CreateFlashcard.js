import FlashcardForm from "./FlashcardForm";

export default function CreateFlashcard({ handleCreateFlashcard }) {
  return (
    <>
      <FlashcardForm onSubmit={handleCreateFlashcard} />;
    </>
  );
}
