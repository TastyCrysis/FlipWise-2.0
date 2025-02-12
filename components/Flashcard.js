import { useState } from "react";
import styled from "styled-components";
import Modal from "@/components/Modal";
import FlashcardForm from "@/components/FlashcardForm";
const StyledFlashcard = styled.div`
  width: 100%;
  height: 150px;
  max-width: 550px;
  margin: 15px auto;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const FlashcardFront = styled.div`
  background: #ff6f61;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const FlashcardBack = styled.div`
  background: #6fb3ff;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const FlashcardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlashcardQuestion = styled.p`
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const FlashcardAnswer = styled.p`
  color: #000;
  margin: 5px 0;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #000;
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  backface-visibility: hidden;
  will-change: transform;
  z-index: 10;
  transform: rotateY(0deg);
`;

const StyledDialog = styled.dialog`
  padding: 16px;
  border: solid 1px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  will-change: transform;
  backface-visibility: hidden;
`;

const OpenButton = styled.button`
  cursor: pointer;
`;

export default function Flashcard({
  flashcard,
  collection,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const [flipped, setFlipped] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFlip() {
    setFlipped(!flipped);
  }

  function toggleConfirmation() {
    setShowConfirmation(!showConfirmation);
  }

  function handleSubmit(data) {
    handleUpdateFlashcard(data);
    setIsModalOpen(false);
  }

  return (
    <StyledFlashcard key={flashcard.id} $flipped={flipped} onClick={handleFlip}>
      <CollectionTitle>{collection.title}</CollectionTitle>
      <FlashcardFront>
        <FlashcardContent>
          <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
        </FlashcardContent>
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleConfirmation();
          }}
        >
          delete
        </button>
        <OpenButton
          onClick={(event) => {
            event.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          edit
        </OpenButton>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Update Flashcard"
          needsPortal={true}
        >
          <FlashcardForm
            onSubmit={handleSubmit}
            initialValues={{
              id: flashcard?.id || "",
              collectionId: flashcard?.collectionId || "",
              question: flashcard?.question || "",
              answer: flashcard?.answer || "",
              isCorrect: flashcard?.isCorrect || false,
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </FlashcardFront>
      <FlashcardBack>
        <FlashcardContent>
          <FlashcardAnswer>
            <b>Answer:</b>
          </FlashcardAnswer>
          <FlashcardAnswer>{flashcard.answer}</FlashcardAnswer>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleToggleCorrect(flashcard.id);
            }}
          >
            {flashcard.isCorrect ? "wrong" : "correct?"}
          </button>
        </FlashcardContent>
      </FlashcardBack>
      <StyledDialog open={showConfirmation}>
        <h3>Do you really want to delete flashcard?</h3>
        <>
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleConfirmation();
            }}
          >
            Cancel
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleConfirmation();
              handleDeleteFlashcard(flashcard.id);
            }}
          >
            Delete
          </button>
        </>
      </StyledDialog>
    </StyledFlashcard>
  );
}
