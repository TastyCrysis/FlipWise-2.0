import styled from "styled-components";
import MenuThreePoint from "@/components/Elements/Menu_threePoint";
import FlashcardOptionMenu from "@/components/FlashcardOptionsMenu";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.cardPrimary};
  color: ${({ theme }) => theme.cardPrimaryText};
  cursor: pointer;
`;

export default function FlashcardOptionButton({ onClick, type, isMenuOpen }) {
  return (
    <>
      <StyledButton type={type} onClick={onClick}>
        <MenuThreePoint />
      </StyledButton>
      {isMenuOpen && <FlashcardOptionMenu />}
    </>
  );
}
