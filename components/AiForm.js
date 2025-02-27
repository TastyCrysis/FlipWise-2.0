import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import AiFlashcardSelect from "./AiFlashcardSelect";
import Image from "next/image";

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 4px 4px 4px 4px;
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
  margin-bottom: 8px;
  vertical-align: top;
  line-height: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
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
  padding: 16px 0 2px 0;
  gap: 16px;
`;

const TooltipText = styled.ol`
  visibility: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.tooltipBackground};
  color: ${({ theme }) => theme.tooltipText};
  border: 1px solid ${({ theme }) => theme.tooltipBorder};
  min-width: 300px;
  max-width: 90vw;
  text-align: left;
  padding: 8px 8px 8px 24px;
  border-radius: 8px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme }) => theme.tooltipBackground} transparent;
    filter: drop-shadow(0 -1px 0 ${({ theme }) => theme.tooltipBorder});
  }
`;

const Icon = styled.span`
  position: relative;
  display: block;
  line-height: 1;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: ${({ theme }) => theme.navbarText};

  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "invert(1)"};
  }
`;

const TooltipContainer = styled.div`
  position: relative;
  cursor: help;
  line-height: 1.2em;
  margin: 0;

  &:hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

const List = styled.ol`
  padding-left: 2px;
  padding-right: 2px;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 4px;
  line-height: 1.2;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function AiForm({
  onClose,
  collections,
  handleCreateCollection,
  handleCreateFlashcard,
  handleCreateAiFlashcards,
}) {
  const [showCollectionInput, setShowCollectionInput] = useState(false);
  const [aiFlashcardSelect, setAiFlashcardSelect] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleCollection() {
    setShowCollectionInput((prev) => !prev);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setFormData(data);

    try {
      const result = await handleCreateAiFlashcards({
        textInput: data.textInput,
        numberOfFlashcards: data.numberOfFlashcards,
        collectionId: showCollectionInput ? null : data.collectionId,
      });

      if (result && result.flashcards) {
        setGeneratedFlashcards(result.flashcards);
        setAiFlashcardSelect(true);
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAiFlashcardSelect() {
    setAiFlashcardSelect((prev) => !prev);
    if (aiFlashcardSelect) {
      setGeneratedFlashcards([]);
      setFormData(null);
      setIsLoading(false);
    }
  }

  async function handleSaveFlashcards(selectedCards) {
    try {
      let collectionId = formData.collectionId;

      if (!collectionId) {
        const collectionResponse = await handleCreateCollection({
          title: formData.title,
        });
        if (!collectionResponse?.data?._id) {
          throw new Error("Failed to create collection");
        }
        collectionId = collectionResponse.data._id;
      }

      const formattedCards = selectedCards.map((card) => ({
        ...card,
        isCorrect: false,
        collectionId,
      }));

      await Promise.all(
        formattedCards.map((card) => handleCreateFlashcard(card))
      );

      setGeneratedFlashcards([]);
      setFormData(null);
      setIsLoading(false);
      setAiFlashcardSelect(false);
      onClose();
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TooltipContainer>
        <Icon>
          <Image src="/asset/info.png" alt="info-logo" width={24} height={24} />
        </Icon>
        <TooltipText>
          <List>
            <ListItem>
              Write a text in the text field and describe the flashcards you
              want to create.
            </ListItem>
            <hr />
            <ListItem>
              Select a number of flashcards you want to create.
            </ListItem>
            <hr />
            <ListItem>
              Select a collection to save the flashcards or create a new one.
            </ListItem>
            <hr />
            <ListItem>
              Click on the generate button to create the flashcards.
            </ListItem>
            <hr />
            <ListItem>A selection of flashcards will be generated.</ListItem>
            <hr />
            <ListItem>
              Unmark the flashcards you don&apos;t want to save.
            </ListItem>
            <hr />
            <ListItem>
              Click on the save button to save the flashcards.
            </ListItem>
            <hr />
            <ListItem>
              In case of serverless vercel timeout, the maximum number of
              flashcards is 20.
            </ListItem>
          </List>
        </TooltipText>
      </TooltipContainer>
      <Label htmlFor="textInput">Question:</Label>
      <Textarea
        id="textInput"
        name="textInput"
        placeholder="Test Question"
        required
      />
      <Label htmlFor="numberOfFlashcards">Number of flashcards:</Label>
      <Input
        id="numberOfFlashcards"
        type="number"
        name="numberOfFlashcards"
        max="20"
        required
      />
      {!showCollectionInput && (
        <>
          <Label htmlFor="collections-select">Collection:</Label>
          <Select
            name="collectionId"
            id="collections-select"
            required={!showCollectionInput}
            disabled={showCollectionInput}
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
        </>
      )}

      {showCollectionInput && (
        <>
          <Label htmlFor="new-collection">New Collection:</Label>
          <Input id="title" name="title" placeholder="Collection*" />
        </>
      )}

      {aiFlashcardSelect && (
        <AiFlashcardSelect
          handleAiFlashcardSelect={handleAiFlashcardSelect}
          generatedFlashcards={generatedFlashcards}
          onSaveSelected={handleSaveFlashcards}
        />
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
          disabled={isLoading}
          buttonLabel={isLoading ? "generating..." : "generate"}
        />
        <Button type="button" onClick={onClose} buttonLabel="cancel" />
      </ButtonContainer>
    </StyledForm>
  );
}
