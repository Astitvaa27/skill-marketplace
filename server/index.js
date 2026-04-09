const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

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
      name: user.name,   // 🔥 THIS IS THE KEY
      isAdmin: user.email === "admin123@gmail.com"
    });
  } else {
    res.json({ message: "Invalid credentials ❌" });
  }
});


// =======================
// 🛠️ SERVICE ROUTES
// =======================

// GET ALL SERVICES
app.get("/services", (req, res) => {
  const data = JSON.parse(fs.readFileSync(serviceFile));
  res.json(data);
});

// ADD SERVICE
app.post("/services", (req, res) => {
  const data = JSON.parse(fs.readFileSync(serviceFile));

  data.push(req.body);

  fs.writeFileSync(serviceFile, JSON.stringify(data, null, 2));

  res.json({ message: "Service added ✅" });
});

// UPDATE SERVICE
app.put("/services/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(serviceFile));

  const index = req.params.index;

  data[index] = req.body;

  fs.writeFileSync(serviceFile, JSON.stringify(data, null, 2));

  res.json({ message: "Service updated ✏️" });
});

// DELETE SERVICE
app.delete("/services/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(serviceFile));

  const index = req.params.index;

  data.splice(index, 1);

  fs.writeFileSync(serviceFile, JSON.stringify(data, null, 2));

  res.json({ message: "Service deleted 🗑️" });
});


// =======================
// 🚀 START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});