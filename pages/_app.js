import GlobalStyle from "../styles";
import { flashcards as initialFlashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);

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

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
      />
    </>
  );
}
