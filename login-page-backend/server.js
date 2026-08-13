require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the backend server!",
  });
});

// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      password,
    } = req.body;

    // Check required fields
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !birthDate ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Connect to database
    const db = await connectDB();

    const usersCollection = db.collection("users");

    // Check if email already exists
    const existingUser = await usersCollection.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      birthDate,
      email: cleanEmail,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Save user to MongoDB
    const result = await usersCollection.insertOne(newUser);

    console.log("✅ New user created:", result.insertedId);

    res.status(201).json({
      message: "Account created successfully!",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);

    res.status(500).json({
      message: "Something went wrong while creating the account.",
    });
  }
});

const PORT = process.env.PORT || 5000;

// Start server only after MongoDB connects
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ Server could not start because MongoDB connection failed."
    );
  }
}

startServer();