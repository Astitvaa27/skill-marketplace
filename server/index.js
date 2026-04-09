const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const filePath = "./services.json";

// GET
app.get("/services", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// POST
app.post("/services", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));

  data.push(req.body); // includes user

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Added" });
});

// DELETE
app.delete("/services/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const index = parseInt(req.params.index);
  data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Deleted" });
});

// PUT
app.put("/services/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const index = parseInt(req.params.index);
  data[index] = req.body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Updated" });
});

app.listen(5000, () => console.log("Server running on port 5000"));

const userFile = "./users.json";

// SIGNUP
app.post("/signup", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userFile));

  const { name, email, password } = req.body;

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.json({ message: "User already exists ❌" });
  }

  const newUser = { name, email, password };

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
    u => u.email === email && u.password === password
  );

  if (user) {
    const isAdmin = user.email === ADMIN_EMAIL;

    console.log("LOGIN USER:", user.email);
    console.log("IS ADMIN:", isAdmin); // 🔍 DEBUG

    res.json({
      message: "Login successful ✅",
      name: user.name,
      isAdmin: isAdmin   // 🔥 MUST SEND THIS
    });
  } else {
    res.json({ message: "Invalid credentials ❌" });
  }
});