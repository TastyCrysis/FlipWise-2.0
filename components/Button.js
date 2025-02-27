import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 5px;
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackground};
  font-size: 16px;
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
  cursor: pointer;
`;

export default function Button({ onClick, buttonLabel, type }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {buttonLabel}
    </StyledButton>
  );
}
