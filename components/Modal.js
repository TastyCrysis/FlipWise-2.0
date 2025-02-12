import styled from "styled-components";
import { createPortal } from "react-dom";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0 32px 0;
`;

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  needsPortal,
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

  return (
    <Overlay>
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
    </Overlay>
  );
}
