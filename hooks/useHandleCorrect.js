import { useState } from "react";

export function useHandleCorrect(initialState) {
  const [flashcards, setFlashcards] = useState(initialState);

  function toggleCorrect(id) {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map(function (flashcard) {
        return flashcard.id === id
          ? { ...flashcard, isCorrect: !flashcard.isCorrect }
          : flashcard;
      })
    );
  }
  return { flashcards, toggleCorrect };
}
