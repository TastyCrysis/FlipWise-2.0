import GlobalStyle from "../styles";
import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isCorrect, setIsCorrect] = useState(false);

  function handleToggleCorrect(id) {
    flashcards.find((Flashcard) =>
      Flashcard.id === id ? (Flashcard.isCorrect = !Flashcard.isCorrect) : ""
    );
    setIsCorrect(!isCorrect);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
      />
    </>
  );
}
