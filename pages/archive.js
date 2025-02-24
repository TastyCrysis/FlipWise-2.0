import ArchiveList from "@/components/FlashcardList";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
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
        />

        <button
          onClick={handleNavigate}
          disabled={selectedCollections.length === 0}
        >
          Show cards
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
