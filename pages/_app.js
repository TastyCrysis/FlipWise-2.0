import GlobalStyle, { theme } from "../styles";
import { flashcards as initialFlashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import { useState } from "react";
import { nanoid } from "nanoid";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";

const StyledTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0px;
`;

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [themeMode, setThemeMode] = useState("dark");

  function handleToggleCorrect(id) {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.id === id
          ? { ...flashcard, isCorrect: !flashcard.isCorrect }
          : flashcard
      )
    );
  }

  function handleDeleteFlashcard(id) {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  }

  function handleCreateFlashcard(data) {
    setFlashcards([{ id: nanoid(), ...data, isCorrect: false }, ...flashcards]);
  }

  function handleUpdateFlashcard(data) {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.id === data.id ? { ...flashcard, ...data } : flashcard
      )
    );
  }

  function handleToggleThemeMode(selectedThemeMode) {
    setThemeMode(selectedThemeMode);
  }

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <GlobalStyle />
      <header>
        <StyledTitle>Flipwise App</StyledTitle>
        <ThemeSwitch
          theme={themeMode}
          onHandleToggleThemeMode={handleToggleThemeMode}
        />
      </header>

      <Component
        {...pageProps}
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
      <Navbar handleCreateFlashcard={handleCreateFlashcard} />
    </ThemeProvider>
  );
}
