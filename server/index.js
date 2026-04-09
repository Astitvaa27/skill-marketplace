const mongoose = require("mongoose");
const Service = require("./models/Service");

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb+srv://astitva:Astitva27@cluster0.ye837kp.mongodb.net/skillmarket?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error",err));

// 🔥 CORS FIX (IMPORTANT)
app.use(cors());

// 🔥 Body parser (for large images if needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 📁 FILE PATHS
const serviceFile = "services.json";
const userFile = "users.json";

// 👑 ADMIN EMAIL



// =======================
// 🔐 AUTH ROUTES
// =======================

// SIGNUP
app.post("/signup", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userFile));

  const { name, email, password } = req.body;

  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.json({ message: "User already exists ❌" });
  }

  const newUser = {
  name: req.body.name,   // 🔥 MUST SAVE NAME
  email: req.body.email,
  password: req.body.password
  };
  users.push(newUser);

  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  res.json({ message: "Signup successful ✅" });
});


// LOGIN
const ADMIN_EMAIL = "admin123@gmail.com";

app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userFile));

  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      message: "Login successful ✅",
      name: user.name,                 // 🔥 IMPORTANT
      isAdmin: user.email === ADMIN_EMAIL  // 🔥 IMPORTANT
    });
  } else {
    res.json({ message: "Invalid credentials ❌" });
  }
});


// =======================
// 🛠️ SERVICE ROUTES
// =======================

// ✅ GET ALL SERVICES
app.get("/services", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

// ✅ ADD SERVICE
app.post("/services", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const { title, price, image, user } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const newService = new Service({
      title,
      price,
      image,
      user
    });

    await newService.save();

    res.json({ message: "Service added ✅" });

  } catch (err) {
    console.log("ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE SERVICE
app.put("/services/:id", async (req, res) => {
  await Service.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated ✅" });
});

// ✅ DELETE SERVICE
app.delete("/services/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});


// =======================
// 🚀 START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});