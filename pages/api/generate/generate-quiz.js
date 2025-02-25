import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { collectionTitle, collectionDescription, existingCards, cardsNeeded } =
    req.body;

  try {
    const prompt = `Generate ${cardsNeeded} unique flashcards for a collection about "${collectionTitle}".
    Description: ${collectionDescription}
    Format each card as a JSON object with "question" and "answer" fields.
    Existing cards: ${JSON.stringify(existingCards)}
    Make sure the new cards don't duplicate existing content.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates educational flashcards.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const generatedCards = JSON.parse(
      completion.data.choices[0].message.content
    );
    return res.status(200).json(generatedCards);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error generating cards" });
  }
}
