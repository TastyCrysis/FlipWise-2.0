import FlashcardForm from "./FlashcardForm";

export default function CreateFlashcard({ handleCreateFlashcard }) {
  return (
    <div>
      <FlashcardForm onSubmit={handleCreateFlashcard} />
    </div>
  );
}
