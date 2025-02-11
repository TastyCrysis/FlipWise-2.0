import { useState } from "react";
import FlashcardForm from "./FlashcardForm";
import styled from "styled-components";
import { createPortal } from "react-dom";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const OpenButton = styled.button`
  /*  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #3b82f6;
  color: white;

  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  position: fixed;
  bottom: 24px;
  right: 24px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
`;

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

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #555;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0 32px 0;
`;

const CloseButton = styled.button`
  padding: 10px 16px;
  background-color: #e5e7eb;
  color: #1f2937;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export default function UpdateModal({ handleUpdateFlashcard, flashcard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data) => {
    handleUpdateFlashcard(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <OpenButton
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        edit
      </OpenButton>

      {isModalOpen &&
        createPortal(
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Update Flashcard"
          >
            <Content>
              <FlashcardForm
                onSubmit={handleSubmit}
                initialValues={{
                  id: flashcard?.id || "",
                  collectionId: flashcard?.collectionId || "",
                  question: flashcard?.question || "",
                  answer: flashcard?.answer || "",
                  isCorrect: flashcard?.isCorrect || false,
                }}
              />
            </Content>
          </Modal>,
          document.body
        )}
    </>
  );
}

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={(e) => e.stopPropagation()}>
      <ModalContainer>
        {title && (
          <Header>
            <Title>{title}</Title>
            <ButtonContainer>
              <CloseIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                ×
              </CloseIcon>
            </ButtonContainer>
          </Header>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
}
