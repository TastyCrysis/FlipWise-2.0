import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  flashcards: [{ type: Schema.Types.ObjectId, ref: "Flashcard" }],
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
