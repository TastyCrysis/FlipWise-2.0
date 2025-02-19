import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();

  try {
    switch (request.method) {
      case "GET": {
        const flashcards = await Flashcard.find();
        return response.status(200).json(flashcards);
      }

      case "POST": {
        const flashcard = await Flashcard.create(request.body);
        return response
          .status(201)
          .json({ status: "Flashcard created", data: flashcard });
      }

      default:
        return response.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
