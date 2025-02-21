import styled from "styled-components";

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
  z-index: 60;
`;

const SelectContainer = styled.div`
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.modalText};
  border: 1px solid ${({ theme }) => theme.modalBorder};
  border-radius: 8px;
  padding: 16px;
  width: 380px;
`;

export default function AiFlashcardSelect({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <SelectContainer onClick={(e) => e.stopPropagation()}>
        <div>Test</div>
      </SelectContainer>
    </Overlay>
  );
}
