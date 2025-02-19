import CollectionList from "@/components/CollectionList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
`;

export default function Homepage({
  flashcards,
  collections,
  handleCreateCollection,
  handleDeleteCollection,
}) {
  return (
    <>
      <Container>
        <StyledPageTitle>List of collections</StyledPageTitle>
      </Container>
      <CollectionList
        flashcards={flashcards}
        collections={collections}
        handleCreateCollection={handleCreateCollection}
        handleDeleteCollection={handleDeleteCollection}
      />
    </>
  );
}
