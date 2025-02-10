import styled from "styled-components";
import Link from "next/link";

const StyledCollectionCardLink = styled(Link)`
  width: 100%;
  height: 150px;
  position: relative;
  max-width: 550px;
  margin: 15px auto;
  text-decoration: none;
  cursor: pointer;
`;

const CollectionCard = styled.div`
  background: #ff6f61;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #000;
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  backface-visibility: hidden;
  will-change: transform;
  z-index: 10;
  transform: rotateY(0deg);
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
    <StyledCollectionCardLink
      href={`/flashcards?collectionId=${collection.id}`}
      key={collection.id}
    >
      <div>
        <CollectionTitle>{collection.title}</CollectionTitle>
        <CollectionCard>
          <p>Number of Flashcards: {numberFlashcards} </p>
          <p>Number of correct Flashcards: {correctFlashcards.length}</p>
          <Link href="/archive">Archive</Link>
        </CollectionCard>
      </div>
    </StyledCollectionCardLink>
  );
}
