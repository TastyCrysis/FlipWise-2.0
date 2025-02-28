import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useSession } from "next-auth/react";

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

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
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
  gap: 8px;
`;

const AddCollectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

export default function FlashcardForm({
  onSubmit,
  initialValues,
  onClose,
  collections,
}) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [showCollectionInput, setShowCollectionInput] = useState(false);
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
      //update Flashcard
      await onSubmit(mergedData, initialValues._id);
    } else {
      //create Flashcard
      const userData = { ...mergedData, owner: userId };
      await onSubmit(userData);
    }
  }

  function handleToggleCollection() {
    setShowCollectionInput((prev) => !prev);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label htmlFor="question">Question:</Label>
      <Input
        id="question"
        type="text"
        name="question"
        placeholder={initialValues ? "" : "Question*"}
        defaultValue={initialValues?.question || ""}
        required
      />
      <Label htmlFor="answer">Answer:</Label>
      <Input
        id="answer"
        type="text"
        name="answer"
        placeholder={initialValues ? "" : "Answer*"}
        defaultValue={initialValues?.answer || ""}
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
          type="submit"
          buttonLabel={initialValues ? "update" : "create"}
        />
        <Button type="button" onClick={onClose} buttonLabel={"cancel"} />
      </ButtonContainer>
    </StyledForm>
  );
}
