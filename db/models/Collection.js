import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
