import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

const StyledPopupMenu = styled.div`
  position: absolute;
  max-width: 100px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 76px;
  left: 10px;
  width: 25%;
  border-radius: 8px;
`;

const StyledDialog = styled.dialog`
  background-color: ${({ theme }) => theme.modalBackground};
  width: 280px;
  margin: 0;
  padding: 0 12px 12px 12px;
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.modalText};
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0 6px 0;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export default function FlashcardOptionsMenu({
  isMenuOpen,
  toggleConfirmation,
  toggleOptionMenu,
  setIsModalOpen = { setIsModalOpen },
}) {
  return (
    <StyledPopupMenu>
      <StyledDialog
        open={isMenuOpen}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <IconContainer>
          <CloseIcon
            onClick={(event) => {
              event.stopPropagation();
              toggleOptionMenu();
            }}
          >
            ×
          </CloseIcon>
        </IconContainer>
        <ButtonContainer>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              toggleConfirmation();
              toggleOptionMenu();
            }}
            buttonLabel={"delete"}
          />
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setIsModalOpen(true);
              toggleOptionMenu();
            }}
            buttonLabel={"edit"}
          />
        </ButtonContainer>
      </StyledDialog>
    </StyledPopupMenu>
  );
}
