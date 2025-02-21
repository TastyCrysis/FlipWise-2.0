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
  const [selectedCollections, setSelectedCollections] = useState([]);
  const router = useRouter();

  const handleCollectionChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCollections(selectedValues);
  };

  const handleNavigate = () => {
    if (selectedCollections.length === 1) {
      // Wenn nur eine Collection gewählt wurde, leiten wir direkt zu ihrer Archivseite
      router.push(`/collections/${selectedCollections[0]}/archive`);
    } else if (selectedCollections.length > 1) {
      // Mehrere Collections => Neue Seite mit Query-Parametern
      const queryString = selectedCollections.join(",");
      router.push(`/collections/selected-archives?ids=${queryString}`);
    }
  };

  return (
    <>
      <Container>
        <StyledPageTitle>Archive</StyledPageTitle>

        {/* Mehrfachauswahl Dropdown */}
        <select
          name="collection-list"
          multiple
          value={selectedCollections}
          onChange={handleCollectionChange}
          style={{ minHeight: "100px", width: "200px" }} // Styling für bessere Usability
        >
          {collections.map((collection) => (
            <option value={collection._id} key={collection._id}>
              {collection.title}
            </option>
          ))}
        </select>

        {/* Button zum Bestätigen der Auswahl */}
        <button
          onClick={handleNavigate}
          disabled={selectedCollections.length === 0}
        >
          Anzeigen
        </button>
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
