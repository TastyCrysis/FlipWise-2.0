import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession } from "next-auth/react";

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
  onHandleToggleThemeMode,
}) {
  //const { data: session } = useSession();
  return (
    <>
      <Container>
        <StyledPageTitle>my profile</StyledPageTitle>
      </Container>
      <ThemeSwitch
        themeMode={themeMode}
        onHandleToggleThemeMode={onHandleToggleThemeMode}
      />
      {/*       {session.user.image && (
        <img
          src={session.user.image}
          alt="Profilbild"
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
        />
      )} */}
      <img src="/asset/user.png" alt="login/image" width={40} height={40} />
    </>
  );
}
