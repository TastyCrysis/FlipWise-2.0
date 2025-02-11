import styled from "styled-components";
import Link from "next/link";

const StyledNav = styled.nav`
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: end;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  background: #ff6f61;
  border-top: 1px solid #6fb3ff;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: inherit;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
`;

export default function Navigation({ children }) {
  return (
    <StyledNav>
      {children}
      <StyledUl>
        <StyledLi>
          <StyledLink href="/" aria-label="go to home page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/" aria-label="add new flashcard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill=""
              stroke="#6fb3ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/archive" aria-label="go to archive page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-archive"
            >
              <path d="M10 12v-1" />
              <path d="M10 18v-2" />
              <path d="M10 7V6" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" />
              <circle cx="10" cy="20" r="2" />
            </svg>
          </StyledLink>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  );
}
