import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

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

const StyledButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.buttonBackground};
  font-size: 13px;
  color: ${({ theme }) => theme.buttonText};
  padding: 5px 10px;
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
  margin: 8px 0;
  cursor: pointer;
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

  const options = collections.map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const handleCollectionChange = (selectedOptions) => {
    setSelectedCollections(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleNavigate = () => {
    if (selectedCollections.length === 1) {
      router.push(`/collections/${selectedCollections[0]}/archive`);
    } else if (selectedCollections.length > 1) {
      const queryString = selectedCollections.join(",");
      router.push(`/collections/selected-archives?ids=${queryString}`);
    }
  };

  const { id } = router.query;

  const currentCollection = collections.find(
    (collection) => collection._id === (id ? String(id) : null)
  );
  const listMode = "archive";

  const filteredFlashcards = currentCollection
    ? flashcards.filter(
        (flashcard) => flashcard.collectionId === currentCollection._id
      )
    : flashcards;

  return (
    <>
      <Container>
        <StyledPageTitle>Archive</StyledPageTitle>
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
              boxShadow: "theme.boxShadowButton",
              borderColor: "theme.border",
              backgroundColor: "theme.background",
              color: "theme.collectionCardText",
              width: "100%",
            }),
          }}
        />

        <StyledButton
          onClick={handleNavigate}
          disabled={selectedCollections.length === 0}
        >
          Show collections
        </StyledButton>
      </Container>
      <StyledCollectionTitle>
        {currentCollection ? currentCollection.title : "All Cards"}
      </StyledCollectionTitle>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
        listMode={listMode}
      />
    </>
  );
}
