import styled from "styled-components";
import Button from "./Button";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 32px 0 8px 0;
`;

export default function CollectioncardForm({
  onSubmit,
  initialValues,
  onClose,
}) {
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

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label htmlFor="collectionUpdate">Collection:</Label>
      <Input
        id="title"
        type="text"
        name="title"
        placeholder={initialValues ? "" : "*"}
        defaultValue={initialValues?.title || ""}
        required
      />
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
