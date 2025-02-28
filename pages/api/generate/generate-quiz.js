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

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({
      message: "Server configuration error: API key is missing",
    });
  }

  const { collectionTitle, existingCards, cardsNeeded, collectionId } =
    request.body;

  try {
    const simplifiedExistingCards = (existingCards || []).map((card) => ({
      question: card.question || "",
      answer: card.answer || "",
    }));

    const prompt = `Generate ${cardsNeeded} unique flashcards for a collection about "${collectionTitle}".
    Format each card as a JSON object with "question" and "answer" fields.
    Existing cards: ${JSON.stringify(simplifiedExistingCards)}
    Make sure the new cards don't duplicate existing content.
    Return ONLY a valid JSON array containing EXACTLY ${cardsNeeded} objects with 'question' and 'answer' properties.
    The response MUST contain exactly ${cardsNeeded} cards, no more and no less.
    
    Rules:
      - Each object must have "question" and "answer" fields
      - Question max length: 100 chars
      - Answer max length: 50 chars
      - Return only the JSON array, no other text
      Example format: [{"question": "What is...?", "answer": "This is..."}]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates educational flashcards. Always respond with valid JSON containing EXACTLY the number of cards requested. Never generate more or fewer cards than requested.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    let content = completion.choices[0].message.content.trim();
    content = content.replace(/^```json\s*|^```\s*|```$/g, "");

    let generatedCards;
    try {
      generatedCards = JSON.parse(content);
    } catch (parseError) {
      console.error("API: JSON parse error:", parseError);
      return response.status(500).json({
        message: "Failed to parse OpenAI response as JSON",
        error: parseError.message,
      });
    }

    if (!Array.isArray(generatedCards)) {
      console.error("API: Response is not an array");
      return response.status(500).json({
        message: "OpenAI response is not an array",
      });
    }

    generatedCards = generatedCards.slice(0, cardsNeeded);

    const completeGeneratedCards = generatedCards.map((card) => ({
      question: card.question.trim(),
      answer:
        typeof card.answer === "string"
          ? card.answer.trim()
          : Array.isArray(card.answer)
          ? card.answer.join(", ")
          : String(card.answer),
      isCorrect: false,
      right: false,
      wrong: false,
      collectionId: collectionId,
    }));

    const finalCards = completeGeneratedCards.slice(0, cardsNeeded);

    if (finalCards.length !== cardsNeeded) {
      console.error(
        `API: Warning - Returning ${finalCards.length} cards instead of requested ${cardsNeeded}`
      );
    }

    return response.status(200).json(finalCards);
  } catch (error) {
    console.error("API Error:", error);
    return response.status(500).json({
      message: "Error generating cards",
      error: error.message || "Unknown error",
    });
  }
}
