import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ArrowChevronRight from "./Elements/Arrow_chevron-right";
import Button from "@/components/Button";
const CardItem = styled.li`
  width: 100%;
  height: 250px;
  max-width: 550px;
  margin: 15px auto;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadowCollectionCard};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.boxShadowCollectionCardHover};
  }
`;

const BaseLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.collectionCardText};
`;

const StyledCardLink = styled(BaseLink)`
  height: 100%;
  position: relative;
`;

const CollectionCardArticle = styled.article`
  height: 100%;
  background: ${({ theme }) => theme.collectionCard};
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 42px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StyledStatsItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 54px;
  }
`;

const StyledStatsItemSpan = styled.span`
  font-weight: 700;
  background: ${({ theme }) => theme.collectionCardText};
  color: ${({ theme }) => theme.collectionCard};
  padding: 4px 8px;
  border-radius: 8px;
`;

const StyledIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 132px;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    left: 70%;
    transform: translate(-50%, -50%);
  }
`;

const StyledLink = styled(BaseLink)`
  position: absolute;
  bottom: 24px;
  right: 24px;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
  transition: all 0.2s;
  padding: 8px 16px;
  border-radius: 6px;
  z-index: 1;

  @media (max-width: 768px) {
    bottom: 12px;
    right: 8px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.collectionCardText};
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: inherit;
    z-index: -1;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.collectionCard};

    &::before {
      opacity: 1;
    }
  }
`;

const StyledDialog = styled.dialog`
  background-color: ${({ theme }) => theme.modalBackground};
  width: 380px;
  margin: 16px 12px 0 10px;
  padding: 0 12px 12px 12px;
  z-index: 10;
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

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 12px;
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

  function toggleConfirmation() {
    setShowConfirmation(!showConfirmation);
  }

  return (
    <CardItem>
      <CollectionCardArticle>
        <StyledCardLink href={`/collections/${collection.id}/flashcards`}>
          <StyledTitle>{collection.title}</StyledTitle>

          <StyledStatsItem>
            Correct Cards:
            <StyledStatsItemSpan>
              {correctFlashcards.length} / {collectionFlashcards.length}
            </StyledStatsItemSpan>
          </StyledStatsItem>

          <StyledIconContainer>
            <ArrowChevronRight />
          </StyledIconContainer>
        </StyledCardLink>
        <StyledLink href={`/collections/${collection.id}/archive`}>
          Archive
        </StyledLink>
        <DeleteButton onClick={toggleConfirmation} type="button">
          delete
        </DeleteButton>
        <StyledDialog open={showConfirmation}>
          <h3>Do you really want to delete this collection?</h3>
          <p>
            🚨 This will also permanently delete all flashcards in this
            collection.
          </p>
          <p>⚠️ This action cannot be undone!</p>
          <ConfirmButtonContainer>
            <Button
              onClick={() => {
                toggleConfirmation();
                handleDeleteCollection(collection.id);
              }}
              type="button"
              buttonLabel={"delete"}
            />
            <Button onClick={toggleConfirmation} buttonLabel={"cancel"} />
          </ConfirmButtonContainer>
        </StyledDialog>
      </CollectionCardArticle>
    </CardItem>
  );
}
