import styled from "styled-components";
import Link from "next/link";

const CardLink = styled.a`
  display: block;
  width: 100%;
  height: 150px;
  max-width: 550px;
  margin: 15px auto;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const CollectionCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ff6f61;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #000;
  margin: 0 0 7px 0;
  position: absolute;
  right: 24px;
  top: 10px;
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
    <>
      <Link href={`/flashcards?collectionId=${collection.id}`} legacyBehavior>
        <CardLink>
          <CollectionCard>
            <CollectionTitle>{collection.title}</CollectionTitle>
            <p>Number of Flashcards: {numberFlashcards}</p>
            <p>Number of correct Flashcards: {correctFlashcards.length}</p>
          </CollectionCard>
        </CardLink>
      </Link>
      <Link href="/archive">Archive</Link>
    </>
  );
}
