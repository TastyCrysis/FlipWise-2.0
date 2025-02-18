import dbConnect from "@/db/connect";
import Collection from "@/db/models/Collection";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const collections = await Collection.find();

    response.status(200).json(collections);
    return;
  }

  if (request.method === "POST") {
    try {
      const collectionData = request.body;
      await Collection.create(collectionData);

      response.status(201).json({ status: "Collection created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
