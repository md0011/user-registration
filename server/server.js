require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors(
  {
    origin: ['https://user-registration-test.vercel.app', 'http://localhost:3000']
  }
));

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
  if (await User.findOne({email: email})){
    return res.status(400).send("This email already registered");
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
const port = process.env.PORT || 5000;

//listen port
app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});