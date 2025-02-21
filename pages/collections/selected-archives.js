import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArchiveList from "@/components/FlashcardList"; // Falls du eine eigene List-Component hast

const StyledCollectionTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 6px;
`;

export default function SelectedArchives({ collections, flashcards }) {
  const router = useRouter();
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);

  useEffect(() => {
    if (router.query.ids) {
      const collectionIds = router.query.ids.split(",");

      // Finde die Collections, die ausgewählt wurden
      const matchedCollections = collections.filter((c) =>
        collectionIds.includes(c._id)
      );
      setSelectedCollections(matchedCollections);

      // Finde die Flashcards, die zu den ausgewählten Collections gehören
      const matchedFlashcards = flashcards.filter((card) =>
        collectionIds.includes(card.collectionId)
      );
      setFilteredFlashcards(matchedFlashcards);
    }
  }, [router.query.ids, collections, flashcards]);

  return (
    <div>
      <h2>Ausgewählte Archive</h2>

      {selectedCollections.length > 0 ? (
        selectedCollections.map((collection) => (
          <div key={collection._id} style={{ marginBottom: "20px" }}>
            <StyledCollectionTitle>{collection.title}</StyledCollectionTitle>

            {/* Zeigt die zugehörigen Flashcards an */}
            <ArchiveList
              flashcards={filteredFlashcards.filter(
                (card) => card.collectionId === collection._id
              )}
              collections={collections}
            />
          </div>
        ))
      ) : (
        <p>Keine Collections gefunden.</p>
      )}
    </div>
  );
}
