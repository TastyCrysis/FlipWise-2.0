import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";
import styled from "styled-components";

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Flashcard = styled.li`
  max-width: 550px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 15px 32px;
  padding: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const FlashcardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlashcardQuestion = styled.p`
  font-weight: bold;
  margin: 0;
`;

const FlashcardAnswer = styled.p`
  color: #555;
  margin: 5px 0;
`;

const CollectionTitle = styled.p`
  text-align: right;
  font-style: italic;
  color: #888;
  margin: 0 0 7px 0;
`;

export default function FlashcardList() {
  return (
    <CardList>
      {flashcards.map((flashcard) => {
        const collection = collections.find(
          (collection) => collection.id === flashcard.collectionId
        );
        return (
          <Flashcard key={flashcard.id}>
            <FlashcardContent>
              <CollectionTitle>{collection.title}</CollectionTitle>
              <div>
                <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
                <FlashcardAnswer>{flashcard.answer}</FlashcardAnswer>
              </div>
            </FlashcardContent>
          </Flashcard>
        );
      })}
    </CardList>
  );
}
