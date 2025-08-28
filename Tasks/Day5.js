
const express = require('express');
const app = express();
const PORT = 3000;

const students = [
  { id: 1, name: "Arunima Paunikar", age: 20, course: "AIML" },
  { id: 2, name: "Rahul Sharma", age: 21, course: "CSE" },
  { id: 3, name: "Sneha Patel", age: 22, course: "IT" }
];


app.get('/', (req, res) => {
  res.json(students);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
