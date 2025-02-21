import styled from "styled-components";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useState, useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const SelectContainer = styled.div`
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.modalText};
  border: 1px solid ${({ theme }) => theme.modalBorder};
  border-radius: 8px;
  padding: 6px 6px 12px 6px;
  max-width: 400px;
  width: 90%;
`;

const Header = styled.header`
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.modalText};
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.modalText};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0 10px 0;
  margin: 0;
`;

const FlashcardList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 0 16px;
`;

const FlashcardItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.modalBorder};
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Checkbox = styled.input`
  margin-top: 4px;
`;

const FlashcardContent = styled.div`
  flex-grow: 1;
`;

const Question = styled.p`
  margin: 0 0 4px 0;
  font-weight: 600;
`;

const Answer = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.modalText}aa;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
`;

export default function AiFlashcardSelect({
  handleAiFlashcardSelect,
  generatedFlashcards,
  onSaveSelected,
}) {
  const [selectedFlashcards, setSelectedFlashcards] = useState(
    generatedFlashcards.map(() => true)
  );

  useEffect(() => {
    setSelectedFlashcards(generatedFlashcards.map(() => true));
  }, [generatedFlashcards]);

  const handleCheckboxChange = (index) => {
    setSelectedFlashcards((prev) => {
      const newSelected = [...prev];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  async function handleSave() {
    const selectedCards = [];
    for (let i = 0; i < generatedFlashcards.length; i++) {
      if (selectedFlashcards[i]) {
        selectedCards.push(generatedFlashcards[i]);
      }
    }
    await onSaveSelected(selectedCards);
  }

  return createPortal(
    <Overlay>
      <SelectContainer>
        <Header>
          <ButtonContainer>
            <CloseIcon onClick={handleAiFlashcardSelect}>×</CloseIcon>
          </ButtonContainer>
          <Title>Select Flashcards</Title>
        </Header>
        <FlashcardList>
          {generatedFlashcards.map((flashcard, index) => (
            <FlashcardItem key={index}>
              <Checkbox
                type="checkbox"
                checked={selectedFlashcards[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <FlashcardContent>
                <Question>{flashcard.question}</Question>
                <Answer>{flashcard.answer}</Answer>
              </FlashcardContent>
            </FlashcardItem>
          ))}
        </FlashcardList>
        <ActionButtonContainer>
          <Button onClick={handleSave} buttonLabel="create" />
          <Button onClick={handleAiFlashcardSelect} buttonLabel="cancel" />
        </ActionButtonContainer>
      </SelectContainer>
    </Overlay>,
    document.body
  );
}
