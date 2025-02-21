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
`;

export default function FlashcardForm({
  onSubmit,
  initialValues,
  onClose,
  collections,
}) {
  const { data: session } = useSession();
  console.log("session_", session);

  async function getUserID() {
    const token = await getToken();
    const userId = token?.sub;
    return userId;
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
    const userId = 1;
    console.log("userId_", userId);
    console.log("initialValues._id_", initialValues._id);
    console.log("mergedData_", mergedData);

    if (initialValues?._id) {
      //create Flashcard
      await onSubmit(initialValues._id, mergedData, userId);
    } else {
      //update Flashcard
      await onSubmit(mergedData);
    }
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
      <Label htmlFor="collections-select">Collection:</Label>
      <Select
        name="collectionId"
        id="collections-select"
        defaultValue={initialValues?.collectionId || ""}
        required
      >
        <option value="" disabled>
          --Please select a collection--
        </option>
        {collections?.map((collection) => (
          <option key={collection._id} value={collection._id}>
            {collection.title}
          </option>
        ))}
      </Select>
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
