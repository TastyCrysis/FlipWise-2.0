import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const CardItem = styled.li`
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

const CollectionCardArticle = styled.article`
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

const StyledTitle = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
`;

const StyledDialog = styled.dialog`
  z-index: 10;
  top: 10px;
  padding: 16px;
  border: solid 1px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function CollectionCard({
  flashcards,
  collection,
  handleDeleteCollection,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const collectionFlashcards = flashcards.filter(
    (flashcard) => flashcard.collectionId === collection.id
  );
  const correctFlashcards = collectionFlashcards.filter(
    (flashcard) => flashcard.isCorrect
  );
  const numberFlashcards = collectionFlashcards.length;

  function toggleConfirmation() {
    setShowConfirmation(!showConfirmation);
  }

  return (
    <CardItem>
      <StyledCardLink href={`/collections/${collection.id}/flashcards`}>
        <CollectionCardArticle>
          <StyledTitle>Collection: {collection.title}</StyledTitle>
          <p>Cards: {numberFlashcards}</p>
          <p>Correct Cards: {correctFlashcards.length}</p>
        </CollectionCardArticle>
      </StyledCardLink>

      <DeleteButton onClick={toggleConfirmation} type="button">
        delete
      </DeleteButton>

      <StyledLink href={`/collections/${collection.id}/archive`}>
        Archive
      </StyledLink>

      <StyledDialog open={showConfirmation}>
        <h3>Do you really want to delete this collection?</h3>
        <p>
          🚨 This will also permanently delete all flashcards in this
          collection.
        </p>
        <p>⚠️ This action cannot be undone!</p>
        <>
          <button onClick={toggleConfirmation}>Cancel</button>
          <button
            onClick={() => {
              toggleConfirmation();
              handleDeleteCollection(collection.id);
            }}
            type="button"
          >
            Delete
          </button>
        </>
      </StyledDialog>
    </CardItem>
  );
}
