require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://user-registration-test.vercel.app', // Allow only requests from this origin
  methods: 'GET,POST', // Allow only these methods
}));

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);

app.post("/api/register", async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).send("All fields are required");
  }
  const user = new User({ name, email, age });
  await user.save();
  res.sendStatus(200);
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//port
const port = process.env.PORT;

//listen port
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`);
});