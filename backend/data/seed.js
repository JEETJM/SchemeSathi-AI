import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

const __dirname = path.resolve();

const centralSchemes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/schemes/central.json"), "utf-8"),
);

const westBengalSchemes = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data/schemes/westBengal.json"),
    "utf-8",
  ),
);

const nationalScholarships = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data/scholarships/national.json"),
    "utf-8",
  ),
);

const westBengalScholarships = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data/scholarships/westBengal.json"),
    "utf-8",
  ),
);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Scheme.deleteMany({});
    await Scholarship.deleteMany({});

    await Scheme.insertMany([...centralSchemes, ...westBengalSchemes]);

    await Scholarship.insertMany([
      ...nationalScholarships,
      ...westBengalScholarships,
    ]);

    console.log("🎉 Database Seeded Successfully");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
