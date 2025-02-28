import CollectionList from "@/components/CollectionList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  width: 100%;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;

  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 16px;
  margin-top: 6px;
`;

export default function CollectionsPage({
  flashcards,
  collections,
  handleCreateCollection,
  handleDeleteCollection,
  handleUpdateCollection,
}) {
  return (
    <>
      <Container>
        <StyledPageTitle>Learning Mode</StyledPageTitle>
      </Container>
      <CollectionList
        flashcards={flashcards}
        collections={collections}
        handleCreateCollection={handleCreateCollection}
        handleDeleteCollection={handleDeleteCollection}
        handleUpdateCollection={handleUpdateCollection}
      />
    </>
  );
}
