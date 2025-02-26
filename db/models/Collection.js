import mongoose from "mongoose";
import "./User";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
