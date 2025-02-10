import styled from "styled-components";
import Collectioncard from "@/components/Collectioncard";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function CollectionList({ flashcards, collections }) {
  return (
    <CardList>
      {collections.length === 0 ? (
        <p>All cards have been deleted.</p>
      ) : (
        collections.map((collection) => {
          return (
            <Collectioncard
              key={collection.id}
              collection={collection}
              flashcards={flashcards}
            />
          );
        })
      )}
    </CardList>
  );
}
