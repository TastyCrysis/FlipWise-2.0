import GlobalStyle from "../styles";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Navbar from "@/components/Navbar";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data: flashcardsData, isLoading: flashcardsLoading } = useSWR(
    "/api/flashcards",
    fetcher
  );
  const { data: collectionsData, isLoading: collectionsLoading } = useSWR(
    "/api/collections",
    fetcher
  );
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (flashcardsData) {
      setFlashcards(flashcardsData);
    }
  }, [flashcardsData]);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (collectionsData) {
      setFlashcards(collectionsData);
    }
  }, [collectionsData]);

  if (flashcardsLoading || collectionsLoading) {
    return <h1>Loading...</h1>;
  }

  if (!flashcardsData || !collectionsData) {
    return;
  }

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

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          flashcards={flashcards}
          collections={collectionsData}
          handleToggleCorrect={handleToggleCorrect}
          handleDeleteFlashcard={handleDeleteFlashcard}
          handleUpdateFlashcard={handleUpdateFlashcard}
        />
        <Navbar handleCreateFlashcard={handleCreateFlashcard} />
      </SWRConfig>
    </>
  );
}
