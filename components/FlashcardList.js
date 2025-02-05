import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import styled from "styled-components";
import Flashcard from "@/components/flashcard";

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0 10px;
  margin: 0;
`;

export default function FlashcardList() {
  return (
    <CardList>
      {flashcards.map((flashcard) => {
        const collection = collections.find(
          (collection) => collection.id === flashcard.collectionId
        );
        return (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            collection={collection}
          />
        );
      })}
    </CardList>
  );
}
