import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;
  await dbConnect();

  try {
    switch (request.method) {
      case "GET": {
        const flashcards = await Flashcard.find();
        return response.status(200).json(flashcards);
      }

      case "POST": {
        if (session) {
          const flashcard = await Flashcard.create({
            ...request.body,
            userId: userId,
          });
          return response
            .status(201)
            .json({ status: "Flashcard created", data: flashcard });
        } else {
          response.status(401).json({ status: "Not authorized" });
        }
      }

      default:
        return response.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
