import styled from "styled-components";
import Link from "next/link";

const CardLink = styled.div`
  width: 100%;
  height: 150px;
  max-width: 550px;
  margin: 15px auto;
  cursor: pointer;
  display: block;
  position: relative;
`;

const StyledCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CollectionCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ff6f61;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  position: relative;
`;

const StyledLink = styled(Link)`
  text-align: right;
  font-style: italic;
  color: #000;
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  bottom: 10px;
`;

export default function Collectioncard({ flashcards, collection }) {
  const collectionFlashcards = flashcards.filter(
    (flashcard) => flashcard.collectionId === collection.id
  );
  const correctFlashcards = collectionFlashcards.filter(
    (flashcard) => flashcard.isCorrect
  );
  const numberFlashcards = collectionFlashcards.length;

  return (
    <CardLink>
      <StyledCardLink href={`/collections/${collection.id}/flashcards`}>
        <CollectionCard>
          <p>Collection: {collection.title}</p>
          <p>Cards: {numberFlashcards}</p>
          <p>Correct Cards: {correctFlashcards.length}</p>
        </CollectionCard>
      </StyledCardLink>
      <StyledLink href={`/collections/${collection.id}/archive`}>
        Archive
      </StyledLink>
    </CardLink>
  );
}
