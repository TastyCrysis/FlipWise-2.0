import GlobalStyle from "../styles";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";
import { theme } from "@/styles";
import { SessionProvider } from "next-auth/react";
import Login from "@/components/Login";

const StyledTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [themeMode, setThemeMode] = useState("dark");
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

  function handleToggleThemeMode(selectedThemeMode) {
    setThemeMode(selectedThemeMode);
  }

  async function handleDeleteCollection(_id) {
    const response = await fetch(`/api/collections/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete collection");
      return;
    }
    mutate();
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <header>
            <StyledTitle>Flipwise App</StyledTitle>
            <ThemeSwitch
              theme={themeMode}
              onHandleToggleThemeMode={handleToggleThemeMode}
            />
          </header>
          <main>
            <Component
              {...pageProps}
              flashcards={flashcards}
              collections={collections}
              handleToggleCorrect={handleToggleCorrect}
              handleDeleteFlashcard={handleDeleteFlashcard}
              handleUpdateFlashcard={handleUpdateFlashcard}
              handleDeleteCollection={handleDeleteCollection}
            />
          </main>
          <footer>
            <Login />
            <Navbar
              handleCreateFlashcard={handleCreateFlashcard}
              collections={collections}
            />
          </footer>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
