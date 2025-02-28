import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  try {
    switch (request.method) {
      case "GET": {
        const users = await User.find();
        if (!users) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(users);
      }
      case "POST": {
        const userIdProvider = await User.create({ ...request.body });
        return response
          .status(201)
          .json({ status: "User created", data: userIdProvider });
      }
      default:
        return response.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
