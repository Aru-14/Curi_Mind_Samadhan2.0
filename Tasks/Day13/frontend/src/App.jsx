import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add / Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`http://localhost:5000/notes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    setEditId(null);
    fetchNotes();
  };

  // Delete Note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  // Edit Note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Notes Application
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Enter title"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-3 rounded-lg w-full mb-3 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter content"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-3 rounded-lg w-full mb-3 transition"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition">
            {editId ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map((note) => (
              <li
                key={note._id}
                className="bg-gradient-to-r from-indigo-50 to-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-bold text-lg text-gray-700 mb-2">
                    {note.title}
                  </h2>
                  <p className="text-gray-600">{note.content}</p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => editNote(note)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
