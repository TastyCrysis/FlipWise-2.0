import styled from "styled-components";
import CollectionCard from "@/components/CollectionCard";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function CollectionList({
  flashcards,
  collections,
  handleDeleteCollection,
}) {
  return collections.length === 0 ? (
    <p>All collections have been deleted.</p>
  ) : (
    <CardList>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          flashcards={flashcards}
          handleDeleteCollection={handleDeleteCollection}
        />
      ))}
    </CardList>
  );
}
