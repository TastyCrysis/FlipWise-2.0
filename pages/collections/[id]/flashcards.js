import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import FlashcardForm from "@/components/FlashcardForm";
import { useState } from "react";
import { useRouter } from "next/router";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OpenButton = styled.button`
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  position: fixed;
  bottom: 24px;
  right: 24px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function Homepage({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleCreateFlashcard,
  handleUpdateFlashcard,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const filteredFlashcards = id
    ? flashcards.filter((flashcard) => flashcard.collectionId === id)
    : flashcards;
  const currentCollection = collections.find(
    (collection) => collection.id === id
  );

  function handleSubmit(data) {
    handleCreateFlashcard(data);
    setIsModalOpen(false);
  }

  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>List of flashcards</h2>
        <h3>{currentCollection && currentCollection.title}</h3>
        <Link href="/">Collections list</Link>
        {currentCollection && (
          <Link href={`/collections/${currentCollection.id}/archive`}>
            Archive
          </Link>
        )}
      </Container>
      <OpenButton onClick={() => setIsModalOpen(true)}>+</OpenButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a new Flashcard"
      >
        <FlashcardForm
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
      <Navbar handleCreateFlashcard={handleCreateFlashcard} />
    </>
  );
}
