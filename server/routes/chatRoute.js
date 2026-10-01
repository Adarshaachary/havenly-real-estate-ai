import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

import { prisma } from "../config/prismaConfig.js";
import { smartFilter } from "../utils/filterEngine.js";

dotenv.config();

const router = express.Router();

// ============================================================
// GEMINI MODELS
// ============================================================

const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const BACKUP_MODEL = "gemini-3.8-flash";

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

// ============================================================
// GEMINI API FUNCTION
// ============================================================

async function callGeminiAPI(
  prompt,
  model = PRIMARY_MODEL
) {
  const response = await fetch(
    `${GEMINI_BASE_URL}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Gemini API Error:", {
      status: response.status,
      message: data?.error?.message,
      code: data?.error?.code,
      statusText: data?.error?.status,
      model,
    });

    if (
      response.status === 503 &&
      model === PRIMARY_MODEL &&
      BACKUP_MODEL
    ) {
      console.log(
        `⚠️ ${PRIMARY_MODEL} is busy. Trying ${BACKUP_MODEL}...`
      );

      return callGeminiAPI(
        prompt,
        BACKUP_MODEL
      );
    }

    return data;
  }

  return data;
}

// ============================================================
// KNOWN LOCATIONS
// ============================================================

const knownCities = [
  "bengaluru",
  "bangalore",
  "mysuru",
  "mysore",
  "chikmagalur",
  "chikkamagaluru",
  "mangaluru",
  "mangalore",
  "udupi",
  "hubballi",
  "hubli",
  "davanagere",
];

// ============================================================
// PROPERTY SEARCH DETECTION
// ============================================================

function isPropertySearchQuery(message) {
  const msgLower = message.toLowerCase();

  const propertyKeywords = [
    // Property types
    "property",
    "properties",
    "villa",
    "villas",
    "house",
    "houses",
    "flat",
    "flats",
    "plot",
    "plots",
    "apartment",
    "apartments",
    "home",
    "homes",
    "estate",
    "estates",
    "bungalow",
    "bungalows",

    // Bedrooms
    "bhk",
    "bed",
    "beds",
    "bedroom",
    "bedrooms",

    // Parking
    "parking",
    "parkings",
    "car parking",
    "car park",

    // Bathrooms
    "bath",
    "baths",
    "bathroom",
    "bathrooms",

    // Amenities
    "amenity",
    "amenities",
    "pool",
    "swimming pool",
    "gym",
    "garden",
    "security",
    "clubhouse",
    "balcony",
    "terrace",
    "lift",
    "elevator",
  ];

  const hasPropertyKeyword =
    propertyKeywords.some((word) =>
      msgLower.includes(word)
    );

  const hasKnownCity =
    knownCities.some((city) =>
      msgLower.includes(city)
    );

  const hasSpecialPropertySearch =
    msgLower.includes("beach") ||
    msgLower.includes("sea") ||
    msgLower.includes("sea view") ||
    msgLower.includes("seaview") ||
    msgLower.includes("coast") ||
    msgLower.includes("coastal") ||
    msgLower.includes("shore") ||
    msgLower.includes("coffee estate") ||
    msgLower.includes("coffee plantation") ||
    msgLower.includes("plantation");

  return (
    hasPropertyKeyword ||
    hasKnownCity ||
    hasSpecialPropertySearch
  );
}

// ============================================================
// PRICE FORMATTER
// ============================================================

function formatIndianPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return "Price not available";
  }

  const crore = 10000000;
  const lakh = 100000;

  // 1 Crore or more
  if (price >= crore) {
    const croreValue = price / crore;

    return `₹${croreValue.toFixed(2)} Crore`;
  }

  // 1 Lakh or more
  if (price >= lakh) {
    const lakhValue = price / lakh;

    return `₹${lakhValue.toFixed(2)} Lakh`;
  }

  // Less than 1 Lakh
  return `₹${price.toLocaleString("en-IN")}`;
}

// ============================================================
// PROPERTY RESULT FORMATTER
// ============================================================

function formatProperty(property) {
  const bedrooms =
    property.facilities?.bedrooms ?? "-";

  const bathrooms =
    property.facilities?.bathrooms ?? "-";

  const parking =
    property.facilities?.parking ?? "-";

  return `
🏡 ${property.title || "Unnamed Property"}

📍 ${property.address || "-"}, ${
    property.city || "-"
  }

💰 ${formatIndianPrice(property.price)}

🏠 Type: ${
    property.propertyType || "-"
  }

🛏️ Bedrooms: ${bedrooms}

🚿 Bathrooms: ${bathrooms}

🚗 Parking: ${parking}

📐 Area: ${
    property.area
      ? `${property.area} sq.ft`
      : "-"
  }

🛋️ Furnishing: ${
    property.furnishing || "-"
  }

📝 ${
    property.description
      ? property.description.substring(
          0,
          180
        )
      : "No description available."
  }

━━━━━━━━━━━━━━━━━━
`;
}

// ============================================================
// CHAT ROUTE
// ============================================================

router.post("/", async (req, res) => {
  const { message } = req.body || {};

  // ==========================================================
  // VALIDATE MESSAGE
  // ==========================================================

  if (
    !message ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return res.status(400).json({
      error: "Message field is required.",
    });
  }

  try {
    const cleanMessage = message.trim();

    const msgLower =
      cleanMessage.toLowerCase();

    // ========================================================
    // CHECK PROPERTY SEARCH
    // ========================================================

    const propertySearch =
      isPropertySearchQuery(
        cleanMessage
      );

    console.log(
      "💬 User:",
      cleanMessage
    );

    console.log(
      "🔍 Property Search:",
      propertySearch
    );

    // ========================================================
    // REAL PROPERTY SEARCH
    // ========================================================

    if (propertySearch) {
      console.log(
        "🏠 Smart Property Search Triggered..."
      );

      // Get all properties from MongoDB
      const all =
        await prisma.residency.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });

      console.log(
        `📦 Properties loaded from database: ${all.length}`
      );

      // Apply smart filtering
      const filtered =
        smartFilter(
          all,
          msgLower
        );

      console.log(
        `🔎 Matching properties: ${filtered.length}`
      );

      // ======================================================
      // NO MATCHING PROPERTIES
      // ======================================================

      if (
        filtered.length === 0
      ) {
        return res.json({
          reply:
            `❌ No matching properties found for "${cleanMessage}".\n\n` +
            `Try specifying details such as:\n` +
            `• Location\n` +
            `• Property type\n` +
            `• BHK\n` +
            `• Budget\n` +
            `• Parking\n` +
            `• Bathrooms\n` +
            `• Amenities`,
        });
      }

      // ======================================================
      // FORMAT PROPERTY RESULTS
      // ======================================================

      const formatted =
        filtered
          .map(formatProperty)
          .join("");

      // ======================================================
      // RETURN REAL DATABASE PROPERTIES
      // ======================================================

      return res.json({
        reply:
          `Here are the matching properties I found:\n\n${formatted}`,

        count: filtered.length,

        properties: filtered,
      });
    }

    // ========================================================
    // NORMAL GEMINI QUESTION
    // ========================================================

    console.log(
      "🤖 Sending question to Gemini..."
    );

    const prompt = `
You are Havenly AI, the AI property assistant for a real-estate website.

Your job is to help users with:

- Real-estate questions
- Property-related questions
- Buying and renting guidance
- General information about locations and properties
- Questions about how this website works

Be helpful, friendly, and easy to understand.

IMPORTANT RULES:

1. Do not invent real properties.
2. Do not invent property prices.
3. Do not invent availability.
4. Do not claim that a property exists unless it comes from the website database.
5. Actual property searches are handled by the website's database search system.
6. If the user asks a general real-estate question, answer normally.
7. Keep answers simple and useful.
8. Do not mention internal database implementation unless the user asks.

User question:

${cleanMessage}
`;

    const data =
      await callGeminiAPI(
        prompt
      );

    // ========================================================
    // GEMINI ERROR
    // ========================================================

    if (data?.error) {
      console.error(
        "❌ Gemini request failed:",
        data.error
      );

      return res.status(502).json({
        error:
          "Gemini API request failed.",
        details:
          data.error.message ||
          "Unknown Gemini API error.",
      });
    }

    // ========================================================
    // GET GEMINI RESPONSE
    // ========================================================

    const reply =
      data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||
      "Sorry, I couldn't generate a response.";

    // ========================================================
    // SEND GEMINI RESPONSE
    // ========================================================

    return res.json({
      reply,
    });
  } catch (err) {
    console.error(
      "❌ Chat Route Error:",
      err
    );

    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

// ============================================================
// EXPORT ROUTER
// ============================================================

export default router;