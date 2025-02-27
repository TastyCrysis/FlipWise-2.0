import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import useNavigationHandler from "@/components/NavigationHandler";
import CustomSelect from "@/components/CustomSelect";

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

export default function SelectedArchives({ collections, flashcards }) {
  const router = useRouter();
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const { handleNavigate } = useNavigationHandler(selectedCollections);

  const options = collections.map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const handleCollectionChange = (selectedOptions) => {
    setSelectedCollections(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  useEffect(() => {
    if (router.query.ids) {
      const collectionIds = router.query.ids.split(",");
      setSelectedCollections(collectionIds);

      const matchedFlashcards = flashcards.filter(
        (card) => collectionIds.includes(card.collectionId) && card.isCorrect
      );
      setFilteredFlashcards(matchedFlashcards);
    }
  }, [router.query.ids, collections, flashcards]);

  return (
    <>
      <Container>
        <StyledPageTitle>Ausgewählte Archive</StyledPageTitle>
        <CustomSelect
          options={options}
          selectedValues={selectedCollections}
          onChange={handleCollectionChange}
        />

        <Button
          onClick={handleNavigate}
          buttonLabel="Show collections"
          fontSize="13px"
          padding="5px 10px"
          margin="8px 0"
          disabled={selectedCollections.length === 0}
        />
      </Container>

      {selectedCollections.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        selectedCollections.map((selectedCollectionId) => {
          const collection = collections.find(
            (c) => c._id === selectedCollectionId
          );
          if (!collection) return null;

          return (
            <li key={selectedCollectionId} style={{ marginBottom: "20px" }}>
              <StyledCollectionTitle>{collection.title}</StyledCollectionTitle>
              <FlashcardList
                flashcards={filteredFlashcards.filter(
                  (card) => card.collectionId === selectedCollectionId
                )}
                collections={collections}
              />
            </li>
          );
        })
      )}
    </>
  );
}
