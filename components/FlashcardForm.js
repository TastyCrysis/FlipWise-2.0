import { collections } from "@/lib/db/collections";

export default function FlashcardForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("data_", data);
    //event.target.reset();
    //event.target.elements.role.focus();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            id="question"
            type="text"
            name="question"
            placeholder="Question*"
            required
          ></input>
          <label htmlFor="answer">Answer:</label>
          <input
            id="answer"
            type="text"
            name="answer"
            placeholder="Answer*"
            required
          ></input>
          <label htmlFor="collections-select">Collection:</label>
          <select required>
            <option value="" disabled selected>
              --Please select a collection--
            </option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.title}>
                {collection.title}
              </option>
            ))}
          </select>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
}
