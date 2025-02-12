import { useState } from "react";
import FlashcardForm from "./FlashcardForm";
import styled from "styled-components";
import { createPortal } from "react-dom";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OpenButton = styled.button`
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

export default function UpdateModal({ handleUpdateFlashcard, flashcard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSubmit(data) {
    handleUpdateFlashcard(data);
    setIsModalOpen(false);
  }

  return (
    <MainContainer>
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
        title="Update a Flashcard"
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
            onClose={() => setIsModalOpen(false)}
          />
        </Content>
      </Modal>
    </MainContainer>
  );
}

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return createPortal(
    <Overlay
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ModalContainer>
        {title && (
          <Header>
            <Title>{title}</Title>
            <ButtonContainer>
              <CloseIcon onClick={onClose}>×</CloseIcon>
            </ButtonContainer>
          </Header>
        )}
        {children}
      </ModalContainer>
    </Overlay>,
    document.body
  );
}
