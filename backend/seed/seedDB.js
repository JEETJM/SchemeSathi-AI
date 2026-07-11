import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Scheme from "../models/Scheme.js";
import schemes from "./schemes.js";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo Connected");

    await Scheme.deleteMany({});
    console.log("Old Data Deleted");

    const result = await Scheme.insertMany(schemes);

    console.log(result);

    console.log("Done");

    process.exit();
  } catch (err) {
    console.log(err);
  }
}

seed();
