import FlashcardForm from "./FlashcardForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  border-radius: 8px;
  margin: 4px 48px 4px 48px;
  padding: 0 0 16px 0;
`;

export default function CreateFlashcard({ handleCreateFlashcard }) {
  return (
    <Container>
      <h3>Create a new Flashcard</h3>
      <FlashcardForm onSubmit={handleCreateFlashcard} />
    </Container>
  );
}
