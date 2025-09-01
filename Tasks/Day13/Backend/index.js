const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (no need for deprecated options)
mongoose.connect("mongodb://127.0.0.1:27017/NotesApp");

// ✅ Define Schema + Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Notes = mongoose.model("Notes", noteSchema);

// ✅ Routes
// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Notes.find();
  res.json(notes);
});

// Add new note
app.post("/notes", async (req, res) => {
  const note = new Notes(req.body);
  await note.save();
  res.json(note);
});

// Update note
app.put("/notes/:id", async (req, res) => {
  const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedNote);
});

// Delete note
app.delete("/notes/:id", async (req, res) => {
  await Notes.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
