import GlobalStyle, { theme } from "../styles";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { SessionProvider } from "next-auth/react";
import Login from "@/components/Login";
import CheckUserExistence from "@/utils/CheckUserExistence";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useRouter } from "next/router";

const StyledTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledLogIn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 4px 4px 0 0;
  gap: 4px;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [themeMode, setThemeMode] = useState("dark");
  const router = useRouter();

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
    mutate: collectionsMutate,
  } = useSWR("/api/collections", fetcher);
  const {
    data: flashcards,
    isLoading: flashcardsLoading,
    error: flashcardError,
    mutate: flashcardsMutate,
  } = useSWR("/api/flashcards", fetcher);

  if (flashcardsLoading || collectionsLoading) {
    return <h1>Loading...</h1>;
  }
  if (flashcardError || collectionsError) {
    return <h1>database is not connected.</h1>;
  }
  if (!flashcards || !collections) {
    return null;
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
    flashcardsMutate();
  }

  async function handleDeleteFlashcard(id) {
    try {
      const response = await fetch(`/api/flashcards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete flashcard");
      }
      flashcardsMutate();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateFlashcard(data) {
    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error("Failed to create flashcard");
        return null;
      }
      flashcardsMutate();
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function handleUpdateFlashcard(data, _id) {
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
    flashcardsMutate();
  }

  async function handleUpdateCollection(data) {
    const response = await fetch(`/api/collections/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to update collection");
      return;
    }
    collectionsMutate();
  }

  async function handleCreateCollection(data) {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error("Failed to create collection");
        return;
      }
      collectionsMutate();
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteCollection(_id) {
    const response = await fetch(`/api/collections/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete collection");
      return;
    }
    collectionsMutate();
  }

  async function handleToggleThemeMode(selectedThemeMode) {
    setThemeMode(selectedThemeMode);
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <header>
            {router.pathname !== "/quiz/session" && (
              <StyledLogIn>
                <Login
                  CheckUserExistence={CheckUserExistence}
                  handleToggleThemeMode={handleToggleThemeMode}
                />
              </StyledLogIn>
            )}
            <StyledTitle>Flipwise App</StyledTitle>
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
              handleUpdateCollection={handleUpdateCollection}
              onHandleToggleThemeMode={handleToggleThemeMode}
            />
          </main>

          <footer>
            {!router.pathname.startsWith("/quiz") &&
              router.pathname !== "/" && (
                <Navbar
                  handleCreateFlashcard={handleCreateFlashcard}
                  collections={collections}
                  handleCreateCollection={handleCreateCollection}
                />
              )}
          </footer>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
