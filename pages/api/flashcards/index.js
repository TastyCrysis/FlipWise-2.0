import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const flaschcards = await Flashcard.find();

    response.status(200).json(flaschcards);
    return;
  }

  if (request.method === "POST") {
    try {
      const flashcardData = request.body;
      await Flashcard.create(flashcardData);

      response.status(201).json({ status: "Product created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
