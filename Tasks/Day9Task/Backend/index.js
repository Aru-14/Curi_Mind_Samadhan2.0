const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const studentsList = [
  { rollNo: 1, name: "Arunima", course: "AIML" },
  { rollNo: 2, name: "Rahul", course: "CSE" },
  { rollNo: 3, name: "Sneha", course: "ECE" },
];

app.get("/getStudents", (req, res) => {
  res.json(studentsList);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
