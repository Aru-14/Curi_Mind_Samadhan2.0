const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Models/db");
const cartRoutes = require("./Routes/CartRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')
const cors = require("cors")
const Cart = require('./Models/Cart')
dotenv.config(); // loads .env file

connectDB(); // connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors())

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", userSchema);



app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
   
    if (await User.findOne({ email })) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
     // 2. Create empty cart for this user
    const cart = new Cart({ userId: newUser._id, items: [] });
    await cart.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.log({ msg: "Server error", error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
console.log("User found",user)
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Routes
app.use("/products", productRoutes);

app.use("/cart", cartRoutes);




// VERIFY TOKEN
app.get("/verify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });
    res.json({ msg: "Token is valid", user: decoded });
  });
});
const PORT=process.env.PORT || 5000;
// =================== SERVER ===================
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
