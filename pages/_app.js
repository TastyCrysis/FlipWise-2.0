import GlobalStyle from "../styles";
import { flashcards as initialFlashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const router = useRouter();

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
    router.push(data.isCorrect ? "/archive" : "/");
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
        handleCreateFlashcard={handleCreateFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
