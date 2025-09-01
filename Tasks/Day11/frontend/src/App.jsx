import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      fetch(`http://localhost:5000/updateStudents/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course }),
      })
        .then((res) => res.json())
        .then(() => {
          fetchStudents();
          setEditId(null);
          setName("");
          setCourse("");
        });
    } else {
      fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course }),
      })
        .then((res) => res.json())
        .then(() => {
          fetchStudents();
          setName("");
          setCourse("");
        });
    }
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:5000/deleteStudents/${id}`, {
      method: "DELETE",
    }).then(() => fetchStudents());
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setCourse(student.course);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
         Student Management
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="Name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Course"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <button
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Student List */}
        <ul className="space-y-3">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center bg-indigo-50 border border-indigo-100 p-4 rounded-lg shadow-sm transition hover:shadow-md"
            >
              <span className="text-gray-800">
                <b className="text-indigo-700">{student.name}</b> —{" "}
                <span className="text-gray-600">{student.course}</span>
              </span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {students.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No students added yet. 👩‍🎓👨‍🎓
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
