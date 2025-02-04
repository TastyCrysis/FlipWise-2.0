import { flashcards } from "@/lib/db/flashcards";
import { collections } from "@/lib/db/collections";

export default function StyledCard() {
  return (
    <>
      <ul>
        {flashcards.map((flashcard) => {
          const collection = collections.find(
            (collection) => collection.id === flashcard.collectionId
          );
          return (
            <li key={flashcard.id}>
              <article>
                <p>{collection.title}</p>
                <div>
                  <p>{flashcard.question}</p>
                  <p>{flashcard.answer}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
