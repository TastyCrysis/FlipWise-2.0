import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  try {
    switch (request.method) {
      case "GET": {
        const user = await User.find();
        return response.status(200).json(user);
      }
      case "POST": {
        const userIdProvider = await User.create({ ...request.body });
        return response
          .status(201)
          .json({ status: "userIdProvider saved", data: userIdProvider });
      }
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
