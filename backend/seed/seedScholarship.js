import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Scholarship from "../models/Scholarship.js";
import scholarships from "./scholarships.js";

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Scholarship.deleteMany();

  await Scholarship.insertMany(scholarships);

  console.log("Scholarships Inserted ✅");

  process.exit();
}

seed();
