import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import ArrowRedoDot from "@/components/Elements/Arrow_redo-dot";

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
  background: ${({ theme }) => theme.cardPrimary};
  color: ${({ theme }) => theme.cardPrimaryText};
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
  box-shadow: ${({ theme }) => theme.boxShadowPrimary};
`;

const FlashcardBack = styled.div`
  background: ${({ theme }) => theme.cardSecondary};
  color: ${({ theme }) => theme.cardSecondaryText};
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  top: 0;
  left: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadowSecondary};
`;

const FlashcardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlashcardBackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 0 24px 24px;
`;

const FlashcardQuestion = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 24px 0;
  text-align: center;
`;

const FlashcardAnswer = styled.p`
  margin: 5px 0;
  font-size: 1.8rem;
  text-decoration: underline;
  font-weight: bolder;
`;

const FlashcardAnswerText = styled.p`
  margin: 5px 0;
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: ${({ theme }) => theme.cardPrimaryText};
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  backface-visibility: hidden;
  will-change: transform;
  z-index: 10;
  transform: rotateY(0deg);
`;

const CardMenu = styled.div`
  text-align: right;
  font-style: italic;
  color: ${({ theme }) => theme.cardPrimaryText};
  margin: 0 0 70px 0;
  position: absolute;
  right: 4px;
  bottom: -72px;
  backface-visibility: hidden;
  will-change: transform;
  z-index: 10;
  transform: rotateY(0deg);
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 12px;
  right: 18px;
  gap: 16px;
`;

export default function QuizFlashcard({ flashcard, collection, onAnswer }) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    setFlipped(!flipped);
  }

  const handleAnswerClick = (answer, event) => {
    event.stopPropagation();
    onAnswer(answer);
    setFlipped(false);
  };

  return (
    <StyledFlashcard
      key={flashcard.id}
      $flipped={flipped}
      onClick={() => {
        handleFlip();
      }}
    >
      {collection && <CollectionTitle>{collection.title}</CollectionTitle>}
      <FlashcardFront>
        <FlashcardContent>
          <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
        </FlashcardContent>
      </FlashcardFront>
      <CardMenu>
        <ArrowRedoDot />
      </CardMenu>
      <FlashcardBack>
        <FlashcardBackContent>
          <FlashcardAnswer>
            <b>Answer:</b>
          </FlashcardAnswer>
          <FlashcardAnswerText>{flashcard.answer}</FlashcardAnswerText>
        </FlashcardBackContent>
        <ButtonContainer>
          <Button
            onClick={(event) => handleAnswerClick("correct", event)}
            buttonLabel={"correct"}
          />
          <Button
            onClick={(event) => handleAnswerClick("wrong", event)}
            buttonLabel={"wrong"}
          />
        </ButtonContainer>
      </FlashcardBack>
    </StyledFlashcard>
  );
}
