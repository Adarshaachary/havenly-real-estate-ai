import express from "express";

import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/resdCntrl.js";

const router = express.Router();

// Create a property
router.post("/create", createResidency);

// Get all properties
router.get("/allresd", getAllResidencies);

// Get a single property
router.get("/:id", getResidency);

export { router as residencyRoute };