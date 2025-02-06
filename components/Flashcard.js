import { useState } from "react";
import styled from "styled-components";

const StyledFlashcard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "flipped",
})`
  width: 100%;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
  max-width: 550px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 15px auto;
  padding: 15px;
`;

const FlashcardFront = styled.div`
  background: #ff6f61;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0px;
  right: 0px;
  z-index: 5;
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
  right: 0px;
  top: 0px;
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
  z-index: 10;
`;

const StyledDialog = styled.dialog`
  padding: 16px;
  border: solid 1px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 25;
`;

export default function Flashcard({
  flashcard,
  collection,
  handleToggleCorrect,
  handleDeleteFlashcard,
}) {
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState(false);

  function handleFlip() {
    setFlipped(!flipped);
  }

  function toggleConfirmation() {
    setMode(!mode);
  }

  return (
    <StyledFlashcard key={flashcard.id} flipped={flipped} onClick={handleFlip}>
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
      </FlashcardFront>
      <FlashcardBack>
        <FlashcardContent>
          <FlashcardAnswer>
            <b>Answer:</b>
          </FlashcardAnswer>
          <FlashcardAnswer>{flashcard.answer}</FlashcardAnswer>
          <button
            onClick={() => {
              handleToggleCorrect(flashcard.id);
            }}
          >
            {flashcard.isCorrect ? "wrong" : "correct?"}
          </button>
        </FlashcardContent>
      </FlashcardBack>
      {mode === true ? (
        <StyledDialog>
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
      ) : null}
    </StyledFlashcard>
  );
}
