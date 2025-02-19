import GlobalStyle from "../styles";
import Navbar from "@/components/Navbar";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const {
    data: flashcards,
    isLoading: flashcardsLoading,
    error: flashcardError,
    mutate,
  } = useSWR("/api/flashcards", fetcher);
  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useSWR("/api/collections", fetcher);
  if (flashcardsLoading || collectionsLoading) {
    return <h1>Loading...</h1>;
  }
  if (flashcardError || collectionsError) {
    return <h1>database is not connected.</h1>;
  }
  if (!flashcards || !collections) {
    return;
  }

  async function handleToggleCorrect(id) {
    const flashcard = flashcards.find((card) => card._id === id);
    const response = await fetch(`/api/flashcards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCorrect: !flashcard.isCorrect }),
    });
    if (!response.ok) {
      console.error("Failed to update flashcard");
      return;
    }
    mutate();
  }

  async function handleDeleteFlashcard(id) {
    try {
      const response = await fetch(`/api/flashcards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete flashcard");
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateFlashcard(data) {
    const response = await fetch("/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to create flashcard");
      return;
    }
    mutate();
  }

  async function handleUpdateFlashcard(_id, data) {
    const response = await fetch(`/api/flashcards/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to update flashcard");
      return;
    }
    mutate();
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          flashcards={flashcards}
          collections={collections}
          handleToggleCorrect={handleToggleCorrect}
          handleDeleteFlashcard={handleDeleteFlashcard}
          handleUpdateFlashcard={handleUpdateFlashcard}
        />
        <Navbar
          handleCreateFlashcard={handleCreateFlashcard}
          collections={collections}
        />
      </SWRConfig>
    </>
  );
}
