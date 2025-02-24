import dbConnect from "@/db/connect";
import Collection from "@/db/models/Collection";

export default async function handler(request, response) {
  await dbConnect();

  try {
    switch (request.method) {
      case "GET": {
        const collections = await Collection.find();
        return response.status(200).json(collections);
      }

      case "POST": {
        const collection = await Collection.create(request.body);
        return response
          .status(201)
          .json({ status: "Collection created", data: collection });
      }

      default:
        return response.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
