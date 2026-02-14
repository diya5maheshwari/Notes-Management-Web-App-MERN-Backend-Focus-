import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Remaining",  "completed"], default: "Remaining" }
});

const Note = mongoose.model("Note", noteSchema);

export default Note;