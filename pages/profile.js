import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
`;

export default function Profile({
  flashcards,
  collections,
  themeMode,
  setThemeMode,
  onHandleToggleThemeMode,
}) {
  return (
    <>
      <Container>
        <StyledPageTitle>my profile</StyledPageTitle>
      </Container>
      <ThemeSwitch
        themeMode={themeMode}
        onHandleToggleThemeMode={onHandleToggleThemeMode}
      />
    </>
  );
}
