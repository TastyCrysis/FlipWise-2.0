import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const flashcard = await Flashcard.findById(id).populate("flashcard");

    if (!flashcard) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(flashcard);
    return;
  }

  if (request.method === "PUT") {
    const updatedFlashcard = request.body;
    await Flashcard.findByIdAndUpdate(id, updatedFlashcard);
    response.status(200).json({ status: "Flashcard successfully updated." });
    return;
  }

  if (request.method === "DELETE") {
    await Flashcard.findByIdAndDelete(id);
    response.status(200).json({ status: "Flashcard successfully deleted." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
