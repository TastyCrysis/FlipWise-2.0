import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

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

export default function AiForm({ initialValues, onClose, collections }) {
  const [showCollectionInput, setShowCollectionInput] = useState(false);

  function handleToggleCollection() {
    setShowCollectionInput((prev) => !prev);
  }

  return (
    <StyledForm>
      <Label htmlFor="question">Question:</Label>
      <Textarea
        id="question"
        type="text"
        name="question"
        placeholder="Test Question"
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
