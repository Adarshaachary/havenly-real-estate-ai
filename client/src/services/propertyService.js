const API_BASE = 'http://localhost:3000/api'

// ============================================================
// PROPERTY IMAGES
// ============================================================
// One fixed image for every property.
// No LoremFlickr
// No random locks
// No generated image URLs
// ============================================================

const PROPERTY_IMAGES = {
  'skyline-serenity-villa':
    'https://images.unsplash.com/photo-1771756743534-4fe2cda63f0d?auto=format&fit=crop&w=1400&q=85',

  'indiranagar-platinum-residency':
    'https://images.unsplash.com/photo-1757356664215-4302d5b4a92d?auto=format&fit=crop&w=1400&q=85',

  'whitefield-royal-estate':
    'https://images.unsplash.com/photo-1701502909888-6b11930e419d?auto=format&fit=crop&w=1400&q=85',

  'green-horizon-villa':
    'https://images.unsplash.com/photo-1560184897-6cdec21b9962?auto=format&fit=crop&w=1400&q=85',

  'oberon-mansion':
    'https://images.unsplash.com/photo-1611189504275-25af94512705?auto=format&fit=crop&w=1400&q=85',

  'prestige-palm-manor':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',

  'palmcrest-elite-villa':
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',

  'summerhill-estate':
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85',

  'crimson-peak-chalet':
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',

  'mysore-palace-view-residence':
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',

  'chamundi-hills-garden-villa':
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85',

  'royal-orchid-3bhk':
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',

  'arabian-sea-breeze-villa':
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85',

  'kadri-heights-residence':
    'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1400&q=85',

  'panambur-coastal-retreat':
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',

  'malpe-sea-view-villa':
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',

  'manipal-garden-apartments':
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85',

  'coffee-valley-estate':
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',

  'misty-hills-retreat':
    'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1400&q=85',

  'coffee-grove-family-home':
    'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1400&q=85',

  'coorg-mistwood-villa':
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',

  'riverstone-plantation-retreat':
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=85',

  'hubballi-central-heights':
    'https://images.unsplash.com/photo-1783125127278-e931d864f23c?auto=format&fit=crop&w=1400&q=85',
}

// ============================================================
// FALLBACK PROPERTY DATA
// ============================================================

const fallbackProperties = [
  {
    id: 'skyline-serenity-villa',
    title: 'Skyline Serenity Villa',
    description:
      'A refined modern villa with generous living spaces, landscaped surroundings and easy access to South Bengaluru.',
    propertyType: 'Villa',
    price: 28500000,
    address: 'JP Nagar 7th Phase',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 3200,
    plotArea: 4200,
    yearBuilt: 2023,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      swimmingPool: true,
      security: true,
      powerBackup: true,
      gym: true,
    },

    nearbyPlaces: [
      'JP Nagar Metro',
      'Brigade Millennium',
      'Banashankari',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'indiranagar-platinum-residency',
    title: 'Indiranagar Platinum Residency',
    description:
      'A sophisticated urban residence close to cafes, restaurants, shopping streets and Bengaluru’s central neighbourhoods.',
    propertyType: 'Apartment',
    price: 19800000,
    address: '12th Main, Indiranagar',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 1,
    },

    area: 2200,
    yearBuilt: 2022,
    furnishing: 'Fully Furnished',

    amenities: {
      gym: true,
      lift: true,
      security: true,
      clubhouse: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      '100 Feet Road',
      'Indiranagar Metro',
      'CMH Road',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'whitefield-royal-estate',
    title: 'Whitefield Royal Estate',
    description:
      'A spacious family residence designed for modern living with peaceful interiors and excellent connectivity to Whitefield.',
    propertyType: 'Villa',
    price: 31500000,
    address: 'Whitefield Main Road',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      balconies: 3,
      floors: 2,
    },

    area: 4100,
    plotArea: 5200,
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      clubhouse: true,
      powerBackup: true,
      terrace: true,
    },

    nearbyPlaces: [
      'ITPL',
      'Phoenix Marketcity',
      'Whitefield Metro',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'green-horizon-villa',
    title: 'The Green Horizon Villa',
    description:
      'A contemporary villa surrounded by greenery with open spaces, natural light and a calm suburban atmosphere.',
    propertyType: 'Villa',
    price: 24800000,
    address: 'Sarjapur Road',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 3500,
    plotArea: 4500,
    yearBuilt: 2024,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      clubhouse: true,
      joggingTrack: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Wipro SEZ',
      'Decathlon Sarjapur',
      'Carmelaram',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'oberon-mansion',
    title: 'The Oberon Mansion',
    description:
      'An elegant residence combining generous proportions, premium finishes and a prestigious Koramangala address.',
    propertyType: 'Mansion',
    price: 52000000,
    address: 'Koramangala 3rd Block',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 5,
      bathrooms: 5,
      parking: 4,
      balconies: 3,
      floors: 3,
    },

    area: 5200,
    plotArea: 6800,
    yearBuilt: 2020,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      swimmingPool: true,
      homeTheatre: true,
      gym: true,
      security: true,
    },

    nearbyPlaces: [
      'Sony World Junction',
      'Forum Mall',
      'Koramangala Club',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'prestige-palm-manor',
    title: 'Prestige Palm Manor',
    description:
      'A spacious family villa in North Bengaluru with landscaped surroundings and generous indoor spaces.',
    propertyType: 'Villa',
    price: 22400000,
    address: 'Yelahanka New Town',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2900,
    plotArea: 3800,
    yearBuilt: 2022,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      clubhouse: true,
      gym: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Yelahanka Lake',
      'RMZ Galleria',
      'Airport Road',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'palmcrest-elite-villa',
    title: 'Palmcrest Elite Villa',
    description:
      'A stylish HSR Layout villa offering modern architecture, private outdoor space and excellent neighbourhood access.',
    propertyType: 'Villa',
    price: 27500000,
    address: 'HSR Layout Sector 2',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 3100,
    plotArea: 3900,
    yearBuilt: 2023,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      security: true,
      terrace: true,
      powerBackup: true,
      smartHome: true,
    },

    nearbyPlaces: [
      '27th Main Road',
      'Agara Lake',
      'HSR BDA Complex',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'summerhill-estate',
    title: 'Summerhill Estate',
    description:
      'A classic Jayanagar residence with warm interiors, mature greenery and a peaceful residential setting.',
    propertyType: 'Independent House',
    price: 34000000,
    address: 'Jayanagar 4th Block',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      balconies: 1,
      floors: 2,
    },

    area: 3000,
    plotArea: 4600,
    yearBuilt: 2018,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      terrace: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Jayanagar Metro',
      'Ragigudda Temple',
      '4th Block Shopping Complex',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'crimson-peak-chalet',
    title: 'Crimson Peak Chalet',
    description:
      'A contemporary residence in South-East Bengaluru designed around open spaces and natural light.',
    propertyType: 'Chalet',
    price: 18500000,
    address: 'Electronic City Phase 1',
    city: 'Bengaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2350,
    plotArea: 3000,
    yearBuilt: 2022,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      powerBackup: true,
      clubhouse: true,
    },

    nearbyPlaces: [
      'Electronic City Metro',
      'Infosys Campus',
      'Neeladri Road',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'mysore-palace-view-residence',
    title: 'Mysore Palace View Residence',
    description:
      'A sophisticated Mysuru home with elegant proportions, comfortable interiors and easy access to the city centre.',
    propertyType: 'Residence',
    price: 14500000,
    address: 'Vijayanagar',
    city: 'Mysuru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2400,
    plotArea: 3200,
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      security: true,
      terrace: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Mysore Palace',
      'Kukkarahalli Lake',
      'Mysore Zoo',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'chamundi-hills-garden-villa',
    title: 'Chamundi Hills Garden Villa',
    description:
      'A peaceful villa surrounded by greenery with a relaxed atmosphere and views toward the Chamundi Hills region.',
    propertyType: 'Villa',
    price: 17200000,
    address: 'Vijayanagar 3rd Stage',
    city: 'Mysuru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2850,
    plotArea: 4200,
    yearBuilt: 2020,
    furnishing: 'Semi Furnished',

    amenities: {
      garden: true,
      security: true,
      terrace: true,
      outdoorSeating: true,
    },

    nearbyPlaces: [
      'Chamundi Hills',
      'Mysore Palace',
      'Karanji Lake',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'royal-orchid-3bhk',
    title: 'Royal Orchid 3BHK Apartment',
    description:
      'A modern three-bedroom apartment with bright interiors and convenient access to Mysuru’s major residential areas.',
    propertyType: 'Apartment',
    price: 8900000,
    address: 'Hebbal',
    city: 'Mysuru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      balconies: 2,
      floors: 1,
    },

    area: 1650,
    yearBuilt: 2023,
    furnishing: 'Fully Furnished',

    amenities: {
      gym: true,
      lift: true,
      security: true,
      clubhouse: true,
    },

    nearbyPlaces: [
      'Hebbal Ring Road',
      'Infosys Mysuru',
      'Dattagalli',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'arabian-sea-breeze-villa',
    title: 'Arabian Sea Breeze Villa',
    description:
      'A coastal villa combining tropical landscaping, spacious interiors and a relaxed Mangaluru lifestyle.',
    propertyType: 'Villa',
    price: 19500000,
    address: 'Bejai',
    city: 'Mangaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      balconies: 3,
      floors: 2,
    },

    area: 3100,
    plotArea: 4500,
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      terrace: true,
      security: true,
      seaView: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Bejai Church',
      'Kadri Park',
      'Kankanady',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'kadri-heights-residence',
    title: 'Kadri Heights Residence',
    description:
      'A modern city residence in one of Mangaluru’s established neighbourhoods with comfortable interiors and strong connectivity.',
    propertyType: 'Apartment',
    price: 10800000,
    address: 'Kadri',
    city: 'Mangaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      balconies: 2,
      floors: 1,
    },

    area: 1800,
    yearBuilt: 2022,
    furnishing: 'Semi Furnished',

    amenities: {
      lift: true,
      gym: true,
      security: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'Kadri Park',
      'Mallikatta',
      'KMC Hospital',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'panambur-coastal-retreat',
    title: 'Panambur Coastal Retreat',
    description:
      'A bright coastal residence designed around fresh air, outdoor living and quick access to Mangaluru’s waterfront.',
    propertyType: 'Coastal Villa',
    price: 16800000,
    address: 'Panambur',
    city: 'Mangaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2500,
    plotArea: 3600,
    yearBuilt: 2023,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      terrace: true,
      seaView: true,
      security: true,
    },

    nearbyPlaces: [
      'Panambur Beach',
      'New Mangalore Port',
      'Surathkal',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'malpe-sea-view-villa',
    title: 'Malpe Sea View Villa',
    description:
      'A relaxed sea-facing villa with tropical surroundings and open spaces made for coastal living.',
    propertyType: 'Sea View Villa',
    price: 21000000,
    address: 'Malpe',
    city: 'Udupi',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      balconies: 3,
      floors: 2,
    },

    area: 2850,
    plotArea: 4200,
    yearBuilt: 2022,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      terrace: true,
      seaView: true,
      outdoorSeating: true,
      security: true,
    },

    nearbyPlaces: [
      'Malpe Beach',
      'St Mary’s Island',
      'Udupi City',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'manipal-garden-apartments',
    title: 'Manipal Garden Apartments',
    description:
      'A contemporary apartment community surrounded by greenery and close to Manipal’s educational and commercial areas.',
    propertyType: 'Apartment',
    price: 7600000,
    address: 'Manipal',
    city: 'Udupi',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      balconies: 2,
      floors: 1,
    },

    area: 1550,
    yearBuilt: 2024,
    furnishing: 'Semi Furnished',

    amenities: {
      lift: true,
      security: true,
      gym: true,
      garden: true,
    },

    nearbyPlaces: [
      'MIT Manipal',
      'Manipal Lake',
      'Tiger Circle',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'coffee-valley-estate',
    title: 'Coffee Valley Estate',
    description:
      'A peaceful plantation property surrounded by coffee greenery, rolling terrain and the cool climate of Chikkamagaluru.',
    propertyType: 'Coffee Estate',
    price: 28500000,
    address: 'Aldur',
    city: 'Chikkamagaluru',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 3,
      balconies: 3,
      floors: 2,
    },

    area: 3600,
    plotArea: 43560,
    yearBuilt: 2019,
    furnishing: 'Fully Furnished',

    amenities: {
      coffeeEstate: true,
      garden: true,
      fireplace: true,
      valleyView: true,
      outdoorSeating: true,
    },

    nearbyPlaces: [
      'Aldur Coffee Estates',
      'Chikkamagaluru Town',
      'Mullayanagiri',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'misty-hills-retreat',
    title: 'Misty Hills Retreat',
    description:
      'A mountain retreat surrounded by greenery and misty landscapes, ideal for peaceful weekend living.',
    propertyType: 'Hill Retreat',
    price: 19800000,
    address: 'Mudigere',
    city: 'Chikkamagaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      balconies: 2,
      floors: 2,
    },

    area: 2400,
    plotArea: 7200,
    yearBuilt: 2020,
    furnishing: 'Fully Furnished',

    amenities: {
      garden: true,
      fireplace: true,
      mountainView: true,
      outdoorSeating: true,
    },

    nearbyPlaces: [
      'Mudigere Town',
      'Bettadabyraveshwara',
      'Chikkamagaluru',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'coffee-grove-family-home',
    title: 'Coffee Grove Family Home',
    description:
      'A comfortable family home tucked into the coffee-growing landscape around Hirekolale with peaceful surroundings.',
    propertyType: 'Estate Home',
    price: 15500000,
    address: 'Hirekolale',
    city: 'Chikkamagaluru',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      balconies: 2,
      floors: 1,
    },

    area: 2100,
    plotArea: 15000,
    yearBuilt: 2018,
    furnishing: 'Semi Furnished',

    amenities: {
      coffeeEstate: true,
      garden: true,
      lakeView: true,
      outdoorSeating: true,
    },

    nearbyPlaces: [
      'Hirekolale Lake',
      'Chikkamagaluru Town',
      'Coffee Museum',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'coorg-mistwood-villa',
    title: 'Coorg Mistwood Villa',
    description:
      'A premium plantation villa in Madikeri surrounded by misty hills, mature trees and peaceful outdoor spaces.',
    propertyType: 'Plantation Villa',
    price: 26500000,
    address: 'Madikeri',
    city: 'Coorg',
    country: 'India',

    facilities: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      balconies: 3,
      floors: 2,
    },

    area: 3300,
    plotArea: 12000,
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',

    amenities: {
      coffeeEstate: true,
      garden: true,
      fireplace: true,
      mountainView: true,
      security: true,
    },

    nearbyPlaces: [
      'Madikeri Fort',
      'Raja Seat',
      'Abbey Falls',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'riverstone-plantation-retreat',
    title: 'Riverstone Plantation Retreat',
    description:
      'A private plantation retreat near Virajpet with generous outdoor space and a calm countryside atmosphere.',
    propertyType: 'Plantation Retreat',
    price: 32000000,
    address: 'Virajpet',
    city: 'Coorg',
    country: 'India',

    facilities: {
      bedrooms: 5,
      bathrooms: 4,
      parking: 4,
      balconies: 4,
      floors: 2,
    },

    area: 4300,
    plotArea: 25000,
    yearBuilt: 2019,
    furnishing: 'Fully Furnished',

    amenities: {
      coffeeEstate: true,
      garden: true,
      riverView: true,
      fireplace: true,
      outdoorSeating: true,
    },

    nearbyPlaces: [
      'Virajpet Town',
      'Nalknad Palace',
      'Talacauvery',
    ],

    availability: 'Available',
    status: 'Active',
  },

  {
    id: 'hubballi-central-heights',
    title: 'Hubballi Central Heights',
    description:
      'A modern city apartment offering practical spaces, contemporary interiors and convenient access to central Hubballi.',
    propertyType: 'Apartment',
    price: 7200000,
    address: 'Vidya Nagar',
    city: 'Hubballi',
    country: 'India',

    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      balconies: 2,
      floors: 1,
    },

    area: 1500,
    yearBuilt: 2023,
    furnishing: 'Semi Furnished',

    amenities: {
      lift: true,
      security: true,
      gym: true,
      powerBackup: true,
    },

    nearbyPlaces: [
      'BVB Campus',
      'Unkal Lake',
      'Vidya Nagar',
    ],

    availability: 'Available',
    status: 'Active',
  },
]

// ============================================================
// ADD IMAGE TO EACH FALLBACK PROPERTY
// ============================================================

const propertiesWithImages = fallbackProperties.map((property) => {
  const image = PROPERTY_IMAGES[property.id]

  return {
    ...property,

    image,

    // Keep this as an array so existing PropertyDetails code
    // that expects "images" will continue working.
    images: image ? [image] : [],
  }
})

// ============================================================
// NORMALIZE BACKEND PROPERTY
// ============================================================
//
// If MongoDB already contains one of our demo properties,
// use our fixed image instead of an old/broken image URL.
//
// For completely new backend properties, their own image is kept.
// ============================================================

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()

const fallbackByTitle = new Map(
  propertiesWithImages.map((property) => [
    normalizeText(property.title),
    property,
  ])
)

function normalizeBackendProperty(property) {
  const matchingFallback = fallbackByTitle.get(
    normalizeText(property.title)
  )

  if (matchingFallback) {
    return {
      ...property,

      image: matchingFallback.image,

      images: matchingFallback.image
        ? [matchingFallback.image]
        : [],
    }
  }

  const backendImage =
    property.image ||
    (Array.isArray(property.images)
      ? property.images[0]
      : '')

  return {
    ...property,

    image: backendImage,

    images:
      Array.isArray(property.images) &&
      property.images.length > 0
        ? property.images
        : backendImage
          ? [backendImage]
          : [],
  }
}

// ============================================================
// GET ALL PROPERTIES
// ============================================================

export async function getProperties() {
  try {
    const response = await fetch(
      `${API_BASE}/residency/allresd`
    )

    if (!response.ok) {
      throw new Error(
        `Property API returned ${response.status}`
      )
    }

    const data = await response.json()

    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeBackendProperty)
    }
  } catch (error) {
    console.warn(
      'Backend properties unavailable. Using demo properties.',
      error
    )
  }

  return propertiesWithImages
}

// ============================================================
// GET SINGLE PROPERTY
// ============================================================

export async function getProperty(id) {
  try {
    const response = await fetch(
      `${API_BASE}/residency/${id}`
    )

    if (!response.ok) {
      throw new Error(
        `Property API returned ${response.status}`
      )
    }

    const data = await response.json()

    if (data) {
      return normalizeBackendProperty(data)
    }
  } catch (error) {
    console.warn(
      'Backend property unavailable. Using demo property.',
      error
    )
  }

  const fallbackProperty = propertiesWithImages.find(
    (property) =>
      String(property.id) === String(id)
  )

  return fallbackProperty || null
}

// ============================================================
// CREATE PROPERTY
// ============================================================

export async function createProperty(propertyData) {
  const response = await fetch(
    `${API_BASE}/residency/create`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        data: propertyData,
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      errorText || 'Unable to create property'
    )
  }

  return response.json()
}

// ============================================================
// EXPORT FALLBACK DATA
// ============================================================

export {
  propertiesWithImages as fallbackProperties,
  PROPERTY_IMAGES,
}