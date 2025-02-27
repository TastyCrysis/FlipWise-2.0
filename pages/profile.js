import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession, signOut } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
`;

const IconLogOut = styled.div`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "brightness(0)"};
  }
`;

const ButtonBar = styled.div`
  display: flex;
  gap: 8px;
`;

//const StyledButton1 = styled(StyledButton)`
const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
  opacity: ${({ $grayout }) => ($grayout ? "0.5" : "1")};

  &:disabled {
    cursor: not-allowed;
    color: var(--primary);
    background-color: var(--secondary);
  }
`;

export default function Profile({
  flashcards,
  collections,
  themeMode,
  onHandleToggleThemeMode,
}) {
  const { data: session } = useSession();
  let userId;
  let userName;
  let userImage;
  if (session) {
    userId = session.user.id;
    userName = session.user.name;
    userImage = session.user.image;
  } else {
    userId = 189611569;
    userName = "Dominik Muster";
    userImage = "/asset/user.png";
  }
  const myCollections = collections.filter(
    (collection) => collection.owner === userId
  ).length;
  console.log("myCollections_", myCollections);
  console.log("Collections_", collections);
  const myFlashcards = flashcards.filter(
    (flashcard) => flashcard.owner === userId
  ).length;
  const myCorrectFlashcards = flashcards
    .filter((flashcard) => flashcard.owner === userId)
    .filter((flashcard) => flashcard.isCorrect === true).length;

  return (
    <>
      <Container>
        <StyledPageTitle>my profile</StyledPageTitle>
        {session && session.user.image && (
          <img
            src={session.user.image}
            alt="profile-image"
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        )}
        {!session && (
          <IconLogOut>
            <img src={userImage} alt="login-image" width={100} height={100} />
          </IconLogOut>
        )}
        <article>
          <h4>statistics</h4>
          <p>Name: {userName}</p>
          <p>number of my collections: {myCollections}</p>
          <p>number of my flashcards: {myFlashcards}</p>
          <p>number of correct flashcards: {myCorrectFlashcards}</p>
        </article>
        <ButtonBar>
          <ThemeSwitch
            themeMode={themeMode}
            onHandleToggleThemeMode={onHandleToggleThemeMode}
          />
          <StyledButton
            onClick={() => signOut()}
            disabled={!session}
            $grayout={!session}
          >
            Sign out
          </StyledButton>
        </ButtonBar>
      </Container>
    </>
  );
}
