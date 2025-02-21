import ArchiveList from "@/components/FlashcardList";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
`;

const StyledCollectionTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 6px;
`;

export default function Archive({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const [selectedCollection, setSelectedCollection] = useState("");
  const router = useRouter();

  const handleCollectionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCollection(selectedId);

    router.push(`/collections/${selectedId}/archive`);
  };

  return (
    <>
      <Container>
        <StyledPageTitle>Archive</StyledPageTitle>

        {/* Dropdown-Menü */}
        <select
          name="collection-list"
          value={selectedCollection}
          onChange={handleCollectionChange}
        >
          <option value="">Wähle eine Kollektion</option>
          {collections.map((collection) => (
            <option value={collection._id} key={collection._id}>
              {collection.title}
            </option>
          ))}
        </select>
      </Container>

      <StyledCollectionTitle>All Cards</StyledCollectionTitle>
      <ArchiveList
        flashcards={flashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
