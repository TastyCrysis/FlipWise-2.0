import styled from "styled-components";
import MenuThreePoint from "@/components/Elements/Menu_threePoint";
import FlashcardOptionMenu from "@/components/FlashcardOptionsMenu";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  width: 64px;
  position: absolute;
  left: 12px;
  bottom: 12px;
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
`;

export default function FlashcardOptionButton({
  type,
  onClick,
  isMenuOpen,
  toggleConfirmation,
  toggleOptionMenu,
  setIsModalOpen,
}) {
  return (
    <>
      <StyledButton type={type} onClick={onClick}>
        <MenuThreePoint />
      </StyledButton>
      {isMenuOpen && (
        <FlashcardOptionMenu
          isMenuOpen={isMenuOpen}
          toggleConfirmation={toggleConfirmation}
          toggleOptionMenu={toggleOptionMenu}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
