import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { collectionId, textInput, numberOfFlashcards } = request.body;

    if (!textInput || !numberOfFlashcards) {
      return response.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = `
      Generate ${numberOfFlashcards} flashcards from this text. Format the output as a JSON array of objects with "question" and "answer" fields:
      ${textInput}

      Rules:
      - Each object must have "question" and "answer" fields
      - Question max length: 100 chars
      - Answer max length: 50 chars
      - It can be more than one answer in the answer field for each question
      - Return only the JSON array, no other text
      Example format: [{"question": "What is...?", "answer": "This is..."}]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates flashcards in JSON format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.9,
    });

    const content = completion.choices[0].message.content
      .trim()
      .replace(/^```json|```$/g, "");

    let flashcards;

    try {
      flashcards = JSON.parse(content);

      if (!Array.isArray(flashcards)) {
        throw new Error("OpenAI response is not an array");
      }

      flashcards.forEach((card) => {
        if (!card.question || !card.answer) {
          throw new Error("Invalid flashcard format");
        }
      });
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      return response.status(500).json({
        message: "Failed to parse OpenAI response",
        error: error.message,
        content,
      });
    }

    const flashcardsAndCollection = {
      flashcards,
      collectionId,
    };

    return response.status(200).json(flashcardsAndCollection);
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
