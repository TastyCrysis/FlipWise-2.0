import { useState } from "react";
import styled from "styled-components";

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

export default function FlashcardOptionMenu() {
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  function toggleOptionMenu() {
    setIsOptionMenuOpen(!isOptionMenuOpen);
  }
  return <StyledPopupMenu>fg</StyledPopupMenu>;
}
