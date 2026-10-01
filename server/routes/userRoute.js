import express from "express";

import {
  allBookings,
  bookVisit,
  cancelBooking,
  createUser,
  getallFavorites,
  toFav,
} from "../controllers/userCntrl.js";

const router = express.Router();

// Register user
router.post("/register", createUser);

// Book a property visit
router.post("/bookVisit/:id", bookVisit);

// Get all bookings
router.post("/allBookings", allBookings);

// Cancel a booking
router.post("/removeBooking/:id", cancelBooking);

// Add/remove favorite property
router.post("/toFav/:rid", toFav);

// Get all favorite properties
router.post("/allFav", getallFavorites);

export { router as userRoute };