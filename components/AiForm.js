import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import AiFlashcardSelect from "./AiFlashcardSelect";

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 4px 24px 4px 24px;
  padding: 0 0 16px 0;
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.modalText};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 118px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  vertical-align: top;
  line-height: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const AddCollectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 32px 0 8px 0;
`;

export default function AiForm({
  initialValues,
  onClose,
  collections,
  onSubmit,
}) {
  const [showCollectionInput, setShowCollectionInput] = useState(false);
  const [aiFlashcardSelect, setAiFlashcardSelect] = useState(false);

  function handleToggleCollection() {
    setShowCollectionInput((prev) => !prev);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const mergedData = {
      ...initialValues,
      ...data,
      isCorrect: initialValues ? initialValues.isCorrect : false,
    };

    if (initialValues?._id) {
      await onSubmit(initialValues._id, mergedData);
    } else {
      await onSubmit(mergedData);
    }
  }

  function handleAiFlashcardSelect() {
    setAiFlashcardSelect((prev) => !prev);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label htmlFor="textInput">Question:</Label>
      <Textarea
        id="textInput"
        type="text"
        name="textInput"
        placeholder="Test Question"
        required
      />
      <Label htmlFor="numberOfFlashcards">Number of flashcards:</Label>
      <Input
        id="numberOfFlashcards"
        type="number"
        name="numberOfFlashcards"
        max="30"
        required
      />
      {!showCollectionInput && (
        <>
          <Label htmlFor="collections-select">Collection:</Label>
          <Select
            name="collectionId"
            id="collections-select"
            defaultValue={initialValues?.collectionId || ""}
            required={!showCollectionInput}
            disabled={showCollectionInput}
          >
            <option value="" disabled>
              --Please select a collection--
            </option>
            {collections &&
              collections.length > 0 &&
              collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.title}
                </option>
              ))}
          </Select>
        </>
      )}

      {showCollectionInput && (
        <>
          <Label htmlFor="new-collection">New Collection:</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Collection*"
          />
        </>
      )}

      {aiFlashcardSelect && <AiFlashcardSelect />}

      <AddCollectionContainer>
        <Button
          type="button"
          onClick={handleToggleCollection}
          buttonLabel={
            showCollectionInput
              ? "Choose existing collection"
              : "Add collection"
          }
        />
      </AddCollectionContainer>
      <ButtonContainer>
        <Button
          type="button"
          onClick={handleAiFlashcardSelect}
          buttonLabel={"create"}
        />
        <Button type="button" onClick={onClose} buttonLabel={"cancel"} />
      </ButtonContainer>
    </StyledForm>
  );
}
