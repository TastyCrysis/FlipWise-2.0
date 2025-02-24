import styled from "styled-components";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useState } from "react";

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

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabButtonFlashcard = styled.button`
  width: 100%;
  background: ${({ $active, theme }) =>
    $active ? theme.modalBackground : theme.buttonBackground};
  color: ${({ $active, theme }) =>
    $active ? theme.modalText : theme.buttonText};
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.modalBorder : theme.modalBorder)};
  border-top: none;
  border-left: none;
  border-radius: 8px 0 0 0;
  padding: 12px 24px;
  margin: -6px -6px 0 -6px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ $active }) =>
    $active &&
    `
    border-top: 2px solid ${({ theme }) => theme.modalBorder};
    border-bottom: none;
  `}
`;

const TabButtonAi = styled.button`
  width: 100%;
  background: ${({ $active, theme }) =>
    $active ? theme.modalBackground : theme.buttonBackground};
  color: ${({ $active, theme }) =>
    $active ? theme.modalText : theme.buttonText};
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.modalBorder : theme.modalBorder)};
  border-top: none;
  border-right: none;
  border-radius: 0 8px 0 0;
  padding: 12px 24px;
  margin: -6px -6px 0 -6px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ $active }) =>
    $active &&
    `
    border-top: 2px solid ${({ theme }) => theme.modalBorder};
    border-bottom: none;
  `}
`;

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  needsPortal,
  switchForm,
  activeTab,
  setActiveTab,
  isUpdateFormOpen,
  isCollectionForm,
}) {
  if (!isOpen) return null;

  if (needsPortal) {
    return createPortal(
      <Overlay
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalContainer>
          {!isUpdateFormOpen && !isCollectionForm && (
            <TabButtonContainer>
              <TabButtonFlashcard
                type="button"
                onClick={() => {
                  setActiveTab("flashcard");
                  switchForm("flashcard");
                }}
                $active={activeTab === "flashcard"}
              >
                Generate Flashcard
              </TabButtonFlashcard>
              <TabButtonAi
                type="button"
                onClick={() => {
                  setActiveTab("ai");
                  switchForm("ai");
                }}
                $active={activeTab === "ai"}
              >
                AI Flashcard
              </TabButtonAi>
            </TabButtonContainer>
          )}
          {title && (
            <Header>
              <ButtonContainer>
                <CloseIcon onClick={onClose}>×</CloseIcon>
              </ButtonContainer>
              <Title>{title}</Title>
            </Header>
          )}
          {children}
        </ModalContainer>
      </Overlay>,
      document.body
    );
  }

  return (
    <Overlay>
      <ModalContainer>
        {title && (
          <Header>
            <ButtonContainer>
              <CloseIcon onClick={onClose}>×</CloseIcon>
            </ButtonContainer>
            <Title>{title}</Title>
          </Header>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
}
