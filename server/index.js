const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ FIX: increase body size (for images)
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ MongoDB
mongoose.connect(
  "mongodb+srv://astitva:Astitva27@cluster0.ye837kp.mongodb.net/skillDB?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ================== SCHEMAS ==================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const serviceSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  user: String,
});

const Service = mongoose.model("Service", serviceSchema);

// ================== AUTH ==================

const ADMIN_EMAIL = "admin123@gmail.com";

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).send("User exists");

    const user = new User({ name, email, password });
    await user.save();

    res.send("Signup successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Signup error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).send("Invalid credentials");

    res.json({
      name: user.name,
      isAdmin: email === ADMIN_EMAIL,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Login error");
  }
});

// ================== SERVICES ==================

app.get("/services", async (req, res) => {
  try {
    const data = await Service.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Fetch error");
  }
});

app.post("/services", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    if (!req.body.title || !req.body.price) {
      return res.status(400).send("Missing fields");
    }

    const service = new Service({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image || "",
      user: req.body.user || "Unknown",
    });

    await service.save();

    console.log("✅ Saved:", service);

    res.json(service);
  } catch (err) {
    console.log("❌ ERROR:", err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Delete error");
  }
});

// ================== SERVER ==================

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});