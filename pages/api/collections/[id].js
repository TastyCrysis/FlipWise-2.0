import dbConnect from "@/db/connect";
import Collection from "@/db/models/Collection";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    switch (request.method) {
      case "GET": {
        const collection = await Collection.findById(id);
        if (!collection) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(collection);
      }

      case "PUT": {
        await Collection.findByIdAndUpdate(id, request.body);
        return response
          .status(200)
          .json({ status: "Collection successfully updated." });
      }

      case "DELETE": {
        await Collection.findByIdAndDelete(id);
        return response
          .status(200)
          .json({ status: "Collection successfully deleted." });
      }

      default:
        return response.status(405).json({ status: "Method not allowed." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
