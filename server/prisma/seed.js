import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../config/prismaConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const residencyFile = path.join(
  __dirname,
  "..",
  "data",
  "Residency.json"
);

const residencies = JSON.parse(
  fs.readFileSync(residencyFile, "utf8")
);

function displayNameFromEmail(email) {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");
}

async function seed() {
  console.log("🌱 Starting database seed...\n");

  // --------------------------------------------------
  // 1. Get unique property owners
  // --------------------------------------------------

  const ownerEmails = [
    ...new Set(
      residencies.map(
        (residency) => residency.userEmail
      )
    ),
  ];

  // --------------------------------------------------
  // 2. Create owners if they don't exist
  // --------------------------------------------------

  for (const email of ownerEmails) {
    await prisma.user.upsert({
      where: {
        email,
      },

      update: {},

      create: {
        email,
        name: displayNameFromEmail(email),
        bookedVisits: [],
        favResidenceiesID: [],
      },
    });
  }

  console.log(
    `👤 Created/verified ${ownerEmails.length} users.`
  );

  // --------------------------------------------------
  // 3. Import properties
  // --------------------------------------------------

  for (const residency of residencies) {
    const {
      id: _id,
      createdAt,
      updatedAt,
      ...property
    } = residency;

    await prisma.residency.upsert({
      where: {
        address_userEmail: {
          address: residency.address,
          userEmail: residency.userEmail,
        },
      },

      update: {
        ...property,
      },

      create: {
        ...property,
        createdAt: new Date(createdAt),
      },
    });
  }

  console.log(
    `🏠 Created/updated ${residencies.length} properties.`
  );

  console.log("\n✅ Database seed completed successfully!");
}

seed()
  .catch((error) => {
    console.error("\n❌ Database seed failed:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });