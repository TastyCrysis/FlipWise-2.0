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
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.modalText};
  border: 1px solid ${({ theme }) => theme.modalBorder};
  border-radius: 8px;
  padding: 6px 6px 12px 6px;
  max-width: 400px;
  width: 90%;
`;

const Header = styled.div`
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
  padding: 0 0 6px 0;
  margin: 0;
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
