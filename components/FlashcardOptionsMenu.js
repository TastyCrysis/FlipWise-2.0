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
  bottom: 6px;
  right: 16px;
  width: 25%;
  height: 80%;
  border-radius: 8px;
  background-color: var(--color-secondary);
`;

export default function FlashcardOptionsMenu({
  isMenuOpen,
  toggleConfirmation,
  toggleOptionMenu,
  setIsModalOpen = { setIsModalOpen },
}) {
  return (
    <StyledPopupMenu>
      <dialog open={isMenuOpen}>
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
      </dialog>
    </StyledPopupMenu>
  );
}
