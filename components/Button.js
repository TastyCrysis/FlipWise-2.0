import styled from "styled-components";

const StyledButton = styled.button`
  border: 2px solid #6fb3ff;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.buttonBackground};
  font-size: 16px;
  color: ${({ theme }) => theme.buttonText};
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default function Button({ onClick, buttonLabel, type }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {buttonLabel}
    </StyledButton>
  );
}
