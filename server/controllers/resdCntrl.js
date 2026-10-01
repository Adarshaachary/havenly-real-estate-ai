import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

/* =========================================================
   CREATE RESIDENCY
   ========================================================= */

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    propertyType,
    price,
    address,
    country,
    city,

    image,
    images,

    facilities,

    area,
    plotArea,
    yearBuilt,
    furnishing,

    amenities,

    latitude,
    longitude,
    nearbyPlaces,

    availability,
    status,

    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        propertyType,
        price,
        address,
        country,
        city,

        image,
        images,

        facilities,

        area,
        plotArea,
        yearBuilt,
        furnishing,

        amenities,

        latitude,
        longitude,
        nearbyPlaces,

        availability,
        status,

        owner: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    res.send({
      message: "Residency created successfully",
      residency,
    });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with this address already exists.");
    }

    throw new Error(err.message);
  }
});

/* =========================================================
   GET ALL RESIDENCIES
   ========================================================= */

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.send(residencies);
});

/* =========================================================
   GET SINGLE RESIDENCY
   ========================================================= */

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id,
      },
    });

    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});