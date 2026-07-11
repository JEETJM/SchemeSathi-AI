import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import dashboardRoute from "./routes/dashboard.js";
import recommendationRoute from "./routes/recommendation.js";
dotenv.config();

import { connectDB } from "./config/mongo.js";
import chatRoute from "./routes/chat.js";

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/dashboard", dashboardRoute);
app.use("/api/recommendations", recommendationRoute);
// Routes
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);
// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SchemeSathi AI Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Started on Port ${PORT}`);
});