import dbConnect from "@/db/connect";
import Collection from "@/db/models/Collection";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const collection = await Collection.findById(id).populate("collection");

    if (!collection) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(collection);
    return;
  }

  if (request.method === "PUT") {
    const updatedCollection = request.body;
    await Collection.findByIdAndUpdate(id, updatedCollection);
    response.status(200).json({ status: "Collection successfully updated." });
    return;
  }

  if (request.method === "DELETE") {
    await Collection.findByIdAndDelete(id);
    response.status(200).json({ status: "Collection successfully deleted." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
