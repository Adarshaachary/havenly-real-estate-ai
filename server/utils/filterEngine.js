// SMART FILTER ENGINE FOR HAVENLY PROPERTIES

export const smartFilter = (properties, query) => {
  const text = query.toLowerCase().trim();

  let results = [...properties];

  // ============================================================
  // 1. LOCATION SEARCH
  // ============================================================

  const locationAliases = {
    bengaluru: ["bengaluru", "bangalore"],
    mysuru: ["mysuru", "mysore"],
    chikmagalur: ["chikmagalur", "chikkamagaluru"],
    mangaluru: ["mangaluru", "mangalore"],
    udupi: ["udupi"],
    hubballi: ["hubballi", "hubli"],
    davanagere: ["davanagere"],

    // Bengaluru area searches
    whitefield: ["whitefield"],
    koramangala: ["koramangala"],
    jayanagar: ["jayanagar"],
    "jp nagar": ["jp nagar"],
    hsr: ["hsr", "hsr layout"],
    yelahanka: ["yelahanka"],
    sarjapur: ["sarjapur"],
    indiranagar: ["indiranagar"],
    "electronic city": ["electronic city"],
  };

  let foundLocation = null;

  for (const [location, aliases] of Object.entries(
    locationAliases
  )) {
    if (aliases.some((alias) => text.includes(alias))) {
      foundLocation = location;
      break;
    }
  }

  if (foundLocation) {
    const aliases = locationAliases[foundLocation];

    results = results.filter((property) => {
      const address = String(
        property.address || ""
      ).toLowerCase();

      const city = String(
        property.city || ""
      ).toLowerCase();

      const title = String(
        property.title || ""
      ).toLowerCase();

      const description = String(
        property.description || ""
      ).toLowerCase();

      return aliases.some(
        (alias) =>
          address.includes(alias) ||
          city.includes(alias) ||
          title.includes(alias) ||
          description.includes(alias)
      );
    });
  }

  // ============================================================
  // 2. PROPERTY TYPE SEARCH
  // ============================================================

  const propertyTypes = {
    villa: ["villa", "villas"],
    house: [
      "house",
      "houses",
      "home",
      "homes",
    ],
    apartment: [
      "apartment",
      "apartments",
      "flat",
      "flats",
    ],
    plot: [
      "plot",
      "plots",
      "land",
    ],
    bungalow: [
      "bungalow",
      "bungalows",
    ],
  };

  let foundPropertyType = null;

  for (const [type, keywords] of Object.entries(
    propertyTypes
  )) {
    if (
      keywords.some((keyword) =>
        text.includes(keyword)
      )
    ) {
      foundPropertyType = type;
      break;
    }
  }

  if (foundPropertyType) {
    const keywords =
      propertyTypes[foundPropertyType];

    results = results.filter((property) => {
      const propertyType = String(
        property.propertyType || ""
      ).toLowerCase();

      const title = String(
        property.title || ""
      ).toLowerCase();

      const description = String(
        property.description || ""
      ).toLowerCase();

      return keywords.some(
        (keyword) =>
          propertyType.includes(keyword) ||
          title.includes(keyword) ||
          description.includes(keyword)
      );
    });
  }

  // ============================================================
  // 3. BUDGET SEARCH
  // ============================================================

  const priceMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(crore|crores|cr|lakh|lakhs|lac|lacs)/
  );

  if (priceMatch) {
    const number = parseFloat(
      priceMatch[1]
    );

    const unit = priceMatch[2];

    let amount = number;

    if (
      unit === "crore" ||
      unit === "crores" ||
      unit === "cr"
    ) {
      amount =
        number * 10000000;
    } else {
      amount =
        number * 100000;
    }

    const isUpperLimit =
      text.includes("under") ||
      text.includes("below") ||
      text.includes("less than") ||
      text.includes("within") ||
      text.includes("upto") ||
      text.includes("up to");

    const isLowerLimit =
      text.includes("above") ||
      text.includes("over") ||
      text.includes("more than") ||
      text.includes("greater than");

    if (isUpperLimit) {
      results = results.filter(
        (property) =>
          Number(property.price || 0) <=
          amount
      );
    } else if (isLowerLimit) {
      results = results.filter(
        (property) =>
          Number(property.price || 0) >=
          amount
      );
    }
  }

  // ============================================================
  // 4. BEDROOM / BHK SEARCH
  // ============================================================

  const bedMatch = text.match(
    /(\d+)\s*(bhk|bed|beds|bedroom|bedrooms)/
  );

  if (bedMatch) {
    const requestedBeds =
      parseInt(
        bedMatch[1],
        10
      );

    results = results.filter(
      (property) => {
        const bedrooms =
          Number(
            property.facilities
              ?.bedrooms || 0
          );

        return (
          bedrooms >=
          requestedBeds
        );
      }
    );
  }

  // ============================================================
  // 5. PARKING SEARCH
  // ============================================================

  const parkingMatch = text.match(
    /(\d+)\s*(parking|parkings|car parking|car park)/
  );

  if (parkingMatch) {
    const requestedParking =
      parseInt(
        parkingMatch[1],
        10
      );

    results = results.filter(
      (property) => {
        const parking =
          Number(
            property.facilities
              ?.parking || 0
          );

        return (
          parking >=
          requestedParking
        );
      }
    );
  }

  // ============================================================
  // 6. BATHROOM SEARCH
  // ============================================================

  const bathroomMatch = text.match(
    /(\d+)\s*(bath|baths|bathroom|bathrooms)/
  );

  if (bathroomMatch) {
    const requestedBathrooms =
      parseInt(
        bathroomMatch[1],
        10
      );

    results = results.filter(
      (property) => {
        const bathrooms =
          Number(
            property.facilities
              ?.bathrooms || 0
          );

        return (
          bathrooms >=
          requestedBathrooms
        );
      }
    );
  }

  // ============================================================
  // 7. BEACH / SEA / COAST SEARCH
  // ============================================================

  const beachWords = [
    "beach",
    "sea",
    "sea view",
    "seaview",
    "coast",
    "coastal",
    "shore",
  ];

  if (
    beachWords.some((word) =>
      text.includes(word)
    )
  ) {
    results = results.filter(
      (property) => {
        const searchableText = `
          ${property.title || ""}
          ${property.address || ""}
          ${property.city || ""}
          ${property.description || ""}
          ${JSON.stringify(
            property.nearbyPlaces || {}
          )}
          ${JSON.stringify(
            property.amenities || {}
          )}
        `.toLowerCase();

        return beachWords.some(
          (word) =>
            searchableText.includes(
              word
            )
        );
      }
    );
  }

  // ============================================================
  // 8. COFFEE ESTATE / PLANTATION SEARCH
  // ============================================================

  const estateWords = [
    "coffee estate",
    "coffee plantation",
    "plantation",
    "estate",
  ];

  if (
    estateWords.some((word) =>
      text.includes(word)
    )
  ) {
    results = results.filter(
      (property) => {
        const searchableText = `
          ${property.title || ""}
          ${property.address || ""}
          ${property.city || ""}
          ${property.description || ""}
          ${property.propertyType || ""}
          ${JSON.stringify(
            property.amenities || {}
          )}
        `.toLowerCase();

        return estateWords.some(
          (word) =>
            searchableText.includes(
              word
            )
        );
      }
    );
  }

  // ============================================================
  // 9. AMENITIES SEARCH
  // ============================================================

  const amenityKeywords = [
    "pool",
    "swimming pool",
    "gym",
    "garden",
    "parking",
    "security",
    "clubhouse",
    "balcony",
    "terrace",
    "lift",
    "elevator",
  ];

  const requestedAmenities =
    amenityKeywords.filter(
      (amenity) =>
        text.includes(amenity)
    );

  if (
    requestedAmenities.length > 0
  ) {
    results = results.filter(
      (property) => {
        const facilitiesText =
          JSON.stringify(
            property.facilities || {}
          ).toLowerCase();

        const amenitiesText =
          JSON.stringify(
            property.amenities || {}
          ).toLowerCase();

        const propertyText = `
          ${property.title || ""}
          ${property.description || ""}
        `.toLowerCase();

        const searchableText =
          facilitiesText +
          " " +
          amenitiesText +
          " " +
          propertyText;

        return requestedAmenities.every(
          (amenity) =>
            searchableText.includes(
              amenity
            )
        );
      }
    );
  }

  // ============================================================
  // 10. FINAL RESULT
  // ============================================================

  return results;
};