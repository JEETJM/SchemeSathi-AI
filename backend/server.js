import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/mongo.js";
import chatRoute from "./routes/chat.js";

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SchemeSathi AI Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Started on Port ${PORT}`);
});