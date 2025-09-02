const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;
const SECRET_KEY =  process.env.SECRET_KEY; 

// Mock database
const users = [];


app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
 
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: "User already exists" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ msg: "User registered successfully" });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const ifMatch = await bcrypt.compare(password, user.password);

  if (!ifMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

//route to verify token from client

app.get("/verify", (req, res) => {

  // Token should be in headers → Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
let token
  if(authHeader)
  {   token = authHeader.split(" ")[1];} // extract token

  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });

 
    res.json({ msg: "Token is valid", user: decoded });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
