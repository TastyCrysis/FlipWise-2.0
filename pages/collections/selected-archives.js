import FlashcardList from "@/components/FlashcardList";
import styled, { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StyledButton } from "@/components/Button";
import Select from "react-select";
import NavigationHandler from "@/components/NavigationHandler";

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

const ArchiveButton = styled(StyledButton)`
  font-size: 13px;
  padding: 5px 10px;
  margin: 8px 0;
`;

export default function SelectedArchives({ collections, flashcards }) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const { handleNavigate } = NavigationHandler({ selectedCollections });

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

      const matchedCollections = collections.filter((c) =>
        collectionIds.includes(c._id)
      );
      setSelectedCollections(matchedCollections);

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
        <Select
          isMulti
          name="collections"
          value={options.filter((option) =>
            selectedCollections.includes(option.value)
          )}
          onChange={handleCollectionChange}
          className="basic-multi-select"
          classNamePrefix="select"
          options={options}
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: theme.boxShadowButton,
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.collectionCardText,
            }),
          }}
        />

        <ArchiveButton
          onClick={handleNavigate}
          disabled={selectedCollections.length === 0}
        >
          Show collections
        </ArchiveButton>
      </Container>

      {selectedCollections.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        selectedCollections.map((selectedCollection) => (
          <div key={selectedCollection._id} style={{ marginBottom: "20px" }}>
            <StyledCollectionTitle>
              {selectedCollection.title}
            </StyledCollectionTitle>
            <FlashcardList
              flashcards={filteredFlashcards.filter(
                (card) => card.collectionId === selectedCollection._id
              )}
              collections={collections}
            />
          </div>
        ))
      )}
    </>
  );
}
