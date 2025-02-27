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

const StyledButton = styled.button`
  height: 20px;
  background-color: ${({ theme }) => theme.cardPrimary};
  color: ${({ theme }) => theme.cardPrimaryText};
  cursor: pointer;
`;

export default function Profile({
  flashcards,
  collections,
  themeMode,
  onHandleToggleThemeMode,
}) {
  //const { data: session } = useSession();
  //const userId = session.user.id;
  const userId = 189611569;
  const myCollections = collections.filter(
    (collection) => collection.owner === userId
  ).length;
  //console.log("myCollections_", myCollections);
  //console.log("Collections_", collections);
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

        {/*       {session.user.image && (
        <img
          src={session.user.image}
          alt="Profilbild"
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
        />
      )} 
       <StyledButton onClick={() => signOut()}>Sign out</StyledButton>*/}
        <IconLogOut>
          <img
            src="/asset/user.png"
            alt="login/image"
            width={100}
            height={100}
          />
        </IconLogOut>
        <article>
          <h4>statistics</h4>
          <p>Name: session.user.name</p>
          <p>number of my collections: {myCollections}</p>
          <p>number of my flashcards: {myFlashcards}</p>
          <p>number of correct flashcards: {myCorrectFlashcards}</p>
        </article>
        <ThemeSwitch
          themeMode={themeMode}
          onHandleToggleThemeMode={onHandleToggleThemeMode}
        />
      </Container>
    </>
  );
}
