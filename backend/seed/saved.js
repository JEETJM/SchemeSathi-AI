import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  saveScheme,
  removeSaved,
  getSavedSchemes,
} from "../controllers/savedController.js";

const router = express.Router();

router.get("/", protect, getSavedSchemes);

router.post("/", protect, saveScheme);

router.delete("/:id", protect, removeSaved);

export default router;
