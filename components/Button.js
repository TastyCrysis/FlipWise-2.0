import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.buttonBackground};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  color: ${({ theme }) => theme.buttonText};
  padding: ${({ padding }) => padding || "10px 20px"};
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  cursor: pointer;
  margin: ${({ margin }) => margin || "0"};

  &:disabled {
    background-color: ${({ theme }) => theme.disabledButtonBackground};
    cursor: not-allowed;
  }
`;

export default function Button({
  onClick,
  buttonLabel,
  type,
  fontSize,
  padding,
  margin,
  disabled,
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      fontSize={fontSize}
      padding={padding}
      margin={margin}
      disabled={disabled}
    >
      {buttonLabel}
    </StyledButton>
  );
}
