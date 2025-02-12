import { collections } from "@/lib/db/collections";
import styled from "styled-components";
import Link from "next/link";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  border-radius: 8px;
  margin: 4px 48px 4px 48px;
  padding: 0 0 16px 0;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function FlashcardForm({
  onSubmit,
  title,
  initialValues,
  onClose,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const mergeData = {
      ...initialValues,
      ...data,
    };

    onSubmit(mergeData);
  }

  return (
    <Container>
      <h3>{title}</h3>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          name="question"
          placeholder={initialValues ? "" : "Question*"}
          defaultValue={initialValues?.question || ""}
          required
        />
        <label htmlFor="answer">Answer:</label>
        <input
          id="answer"
          type="text"
          name="answer"
          placeholder={initialValues ? "" : "Answer*"}
          defaultValue={initialValues?.answer || ""}
          required
        />
        <label htmlFor="collections-select">Collection:</label>
        <select
          name="collectionId"
          id="collections-select"
          defaultValue={initialValues?.collectionId || ""}
          required
        >
          <option value="" disabled>
            --Please select a collection--
          </option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select>
        <button type="submit">{initialValues ? "update" : "create"}</button>
        {initialValues && (
          <button type="button" onClick={onClose}>
            cancel
          </button>
        )}
      </StyledForm>
    </Container>
  );
}
