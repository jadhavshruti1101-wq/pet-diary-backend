const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary data
let users = [];

// GET - Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST - Create a user
app.post("/users", (req, res) => {
  const user = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  users.push(user);

  res.status(201).json({
    message: "User created successfully",
    user: user,
  });
});

// PUT - Update a user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

// DELETE - Delete a user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userExists = users.some((u) => u.id === id);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users = users.filter((u) => u.id !== id);

  res.json({
    message: "User deleted successfully",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Pet Diary API running on port ${PORT}`);
});