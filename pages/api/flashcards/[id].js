import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    switch (request.method) {
      case "GET": {
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(flashcard);
      }

      case "PUT": {
        await Flashcard.findByIdAndUpdate(id, request.body);
        return response
          .status(200)
          .json({ status: "Flashcard successfully updated." });
      }

      case "DELETE": {
        await Flashcard.findByIdAndDelete(id);
        return response
          .status(200)
          .json({ status: "Flashcard successfully deleted." });
      }

      default:
        return response.status(405).json({ status: "Method not allowed." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
