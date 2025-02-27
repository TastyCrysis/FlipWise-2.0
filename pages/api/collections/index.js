import dbConnect from "@/db/connect";
import Collection from "@/db/models/Collection";
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
        if (session) {
          const collectionsUser = await Collection.find({
            owner: userId,
          });
          const collectionsDefault = await Collection.find({
            owner: { $exists: false },
          });
          const collections = [...collectionsUser, ...collectionsDefault];

          return response.status(200).json(collections);
        } else {
          const collections = await Collection.find({
            owner: { $exists: false },
          });
          return response.status(200).json(collections);
        }
      }

      case "POST": {
        if (session) {
          const collection = await Collection.create({
            ...request.body,
          });
          return response
            .status(201)
            .json({ status: "Collection created", data: collection });
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
