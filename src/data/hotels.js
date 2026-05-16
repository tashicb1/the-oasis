// ============================================================
// hotels.js — This is our "database" (fake data for now)
// In a real project, this would come from a backend API.
// Each hotel object has all the info we need to display.
// ============================================================

export const hotels = [
  {
    id: 1,
    name: "The Grand Monarch",
    location: "Mumbai",
    type: "Luxury",
    price: 8500,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "WiFi", "Parking"],
    description:
      "Experience unparalleled luxury in the heart of Mumbai. The Grand Monarch offers breathtaking views, world-class dining, and an award-winning spa.",
    rooms: ["Deluxe Room", "Suite", "Presidential Suite"],
    available: true,
  },
  {
    id: 2,
    name: "Seaside Serenity",
    location: "Goa",
    type: "Beach",
    price: 5500,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["Beach Access", "Pool", "Bar", "WiFi", "Water Sports"],
    description:
      "Wake up to the sound of waves at Seaside Serenity. This beachfront resort in Goa offers the perfect blend of relaxation and adventure.",
    rooms: ["Sea View Room", "Beach Cottage", "Honeymoon Suite"],
    available: true,
  },
  {
    id: 3,
    name: "Mountain Retreat",
    location: "Shimla",
    type: "Mountain",
    price: 4200,
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1551882547-ff40c4a49f9b?w=800&q=80",
    amenities: ["Fireplace", "Restaurant", "WiFi", "Trekking", "Library"],
    description:
      "Nestled in the Himalayas, Mountain Retreat offers cozy rooms with stunning valley views, perfect for a peaceful getaway.",
    rooms: ["Valley View Room", "Deluxe Cottage", "Family Suite"],
    available: true,
  },
  {
    id: 4,
    name: "Heritage Palace",
    location: "Jaipur",
    type: "Heritage",
    price: 7000,
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    amenities: ["Pool", "Restaurant", "Spa", "WiFi", "Cultural Tours"],
    description:
      "Stay in a royal Rajasthani palace. Heritage Palace blends historic grandeur with modern comforts for a truly royal experience.",
    rooms: ["Maharaja Room", "Royal Suite", "Garden Cottage"],
    available: true,
  },
  {
    id: 5,
    name: "City Central Inn",
    location: "Delhi",
    type: "Budget",
    price: 2200,
    rating: 4.2,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["WiFi", "Breakfast", "Parking", "24/7 Reception"],
    description:
      "Affordable comfort in the heart of Delhi. City Central Inn is ideal for business travelers and tourists on a budget.",
    rooms: ["Standard Room", "Deluxe Room", "Twin Room"],
    available: true,
  },
  {
    id: 6,
    name: "Backwater Bliss",
    location: "Kerala",
    type: "Beach",
    price: 6300,
    rating: 4.8,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    amenities: ["Houseboat", "Pool", "Ayurveda Spa", "Restaurant", "WiFi"],
    description:
      "Float through Kerala's famous backwaters and unwind in lush green surroundings. An experience you'll never forget.",
    rooms: ["Houseboat Suite", "Garden Room", "Deluxe Villa"],
    available: false,
  },
];

// All unique locations (used for filter dropdown)
export const locations = ["All", "Mumbai", "Goa", "Shimla", "Jaipur", "Delhi", "Kerala"];

// All hotel types (used for filter)
export const hotelTypes = ["All", "Luxury", "Beach", "Mountain", "Heritage", "Budget"];
