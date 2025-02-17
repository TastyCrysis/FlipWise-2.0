import GlobalStyle from "../styles";
import { flashcards as initialFlashcards } from "@/lib/db/flashcards";
import { collections as initialCollections } from "@/lib/db/collections";
import { useState } from "react";
import { nanoid } from "nanoid";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [collections, setCollections] = useState(initialCollections);

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

  function handleDeleteCollection(id) {
    setCollections(collections.filter((collection) => collection.id !== id));
    setFlashcards(
      flashcards.filter((flashcard) => flashcard.collectionId !== id)
    );
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
        handleUpdateFlashcard={handleUpdateFlashcard}
        handleDeleteCollection={handleDeleteCollection}
      />
      <Navbar handleCreateFlashcard={handleCreateFlashcard} />
    </>
  );
}
