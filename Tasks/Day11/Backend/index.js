const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON request body

// In-memory "database"
let students = [
  { id: 1, name: "Arunima", course: "AIML" },
  { id: 2, name: "Rahul", course: "CSE" },
  { id: 3, name: "Sneha", course: "ECE" },
];

// ✅ GET → Read all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ✅ GET → Read single student by id
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  student ? res.json(student) : res.status(404).json({ message: "Student not found" });
});

// ✅ POST → Add a new student
app.post("/students", (req, res) => {
  const { name, course } = req.body;
  const newStudent = { id: Date.now(), name, course };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ PUT → Update student
app.put("/updateStudents/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;
  let student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name || student.name;
  student.course = course || student.course;

  res.json(student);
});

app.delete("/deleteStudents/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = students.length;
  students = students.filter(s => s.id !== id);

  if (students.length === initialLength) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
