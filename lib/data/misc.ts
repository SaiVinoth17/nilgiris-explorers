export const sightseeingCircuits = [
  {
    id: "ooty",
    name: "Ooty Sightseeing Package",
    places: "Doddabetta Peak, Tea Factory & Museum, Wax Museum, Botanical Garden, Rose Garden, Boat House",
    rates: [
      { vehicle: "4 Seater (Hatchback/Sedan)", price: 1999, capacity: "4+1" },
      { vehicle: "7 Seater (Innova/SUV)", price: 2999, capacity: "7+1" }
    ]
  },
  {
    id: "pykara",
    name: "Pykara Sightseeing Package",
    places: "Golf Links (View Point), Pine Forest, Kamaraj Sagar Dam, School Mund, 9th Mile Shooting Spot, Pykara Waterfalls, Pykara Boat House",
    rates: [
      { vehicle: "4 Seater (Hatchback/Sedan)", price: 2499, capacity: "4+1" },
      { vehicle: "7 Seater (Innova/SUV)", price: 3499, capacity: "7+1" }
    ]
  },
  {
    id: "coonoor",
    name: "Coonoor Sightseeing Package",
    places: "Valley View Point, Sim's Park, Tea Garden, Lamb's Rock, Dolphin's Nose, Golf Links, MRC (Outside View)",
    rates: [
      { vehicle: "4 Seater (Hatchback/Sedan)", price: 2499, capacity: "4+1" },
      { vehicle: "7 Seater (Innova/SUV)", price: 3499, capacity: "7+1" }
    ]
  }
];

export const outstationTransfers = [
  {
    id: "cbe_airport",
    name: "Coimbatore Airport Transfer",
    distance: "90 km (3.5 hrs)",
    rates: { hatchback: 2200, sedan: 2500, suv: 3500, innova: 4400, tempo: 6500 }
  },
  {
    id: "cbe_station",
    name: "Coimbatore Railway Station Transfer",
    distance: "86 km (3 hrs)",
    rates: { hatchback: 2200, sedan: 2500, suv: 3500, innova: 4400, tempo: 6500 }
  },
  {
    id: "mtp_station",
    name: "Mettupalayam Railway Station Pickup/Drop",
    distance: "52 km (2 hrs)",
    rates: { hatchback: 1800, sedan: 2000, suv: 2800, innova: 3000, tempo: 4800 }
  },
  {
    id: "mysore_junction",
    name: "Mysore City / Railway Station Transfer",
    distance: "125 km (4 hrs)",
    rates: { hatchback: 4000, sedan: 4200, suv: 6000, innova: 7500, tempo: 10000 }
  },
  {
    id: "blr_airport",
    name: "Bangalore Kempegowda Airport Transfer",
    distance: "310 km (7.5 hrs)",
    rates: { hatchback: 7800, sedan: 8500, suv: 10000, innova: 13000, tempo: 18000 }
  },
  {
    id: "blr_city",
    name: "Bangalore City / Railway Station Transfer",
    distance: "275 km (6.5 hrs)",
    rates: { hatchback: 7500, sedan: 8000, suv: 10000, innova: 13000, tempo: 18000 }
  }
];

export const accommodationPackages = [
  {
    id: "budget_hotel",
    name: "Cozy Budget Stay",
    type: "Standard Hotel",
    price: 2499,
    originalPrice: 3500,
    highlights: ["Free WiFi", "Hot Water 24/7", "Close to Town Centre", "Clean & Hygienic Rooms"],
    image: "/images/stunning_tea_estate.png",
    rating: 4.5,
    reviews: 210,
    badge: "Great Value",
  },
  {
    id: "tea_cottage",
    name: "Premium Tea Valley Cottage",
    type: "Private Wooden Cottage",
    price: 4499,
    originalPrice: 6000,
    highlights: ["Misty Valley Balcony", "Campfire & BBQ Facility", "Local Homecooked Food", "Tea Plantation Walk"],
    image: "/images/stunning_tea_estate.png",
    rating: 4.8,
    reviews: 140,
    badge: "Highly Rated",
  },
  {
    id: "heritage_bungalow",
    name: "Heritage Colonial Estate Stay",
    type: "Historic British Bungalow",
    price: 6499,
    originalPrice: 9000,
    highlights: ["Fireplace in Room", "Antique Colonial Decor", "Private Garden", "Dedicated Butler Service"],
    image: "/images/stunning_panoramic_hero.png",
    rating: 4.9,
    reviews: 75,
    badge: "Heritage Experience",
  },
  {
    id: "luxury_resort",
    name: "Five-Star Luxury Resort",
    type: "Premium Hilltop Resort",
    price: 8999,
    originalPrice: 12500,
    highlights: ["Infinity Valley Pool", "Premium Spa & Wellness", "Fine Dining Restaurants", "Kid's Activity Zone"],
    image: "/images/real_hero.jpg",
    rating: 4.9,
    reviews: 110,
    badge: "Ultra Luxury",
  }
];

export const fleet = [
  {
    id: 1,
    name: "Hatchback",
    model: "Swift / i10",
    capacity: 4,
    luggage: "2 bags",
    ac: true,
    price: 12,
    features: ["Air Conditioned", "Music System", "GPS Tracked", "Clean & Sanitized"],
    icon: "🚗",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Sedan",
    model: "Dzire / Aspire",
    capacity: 4,
    luggage: "3 bags",
    ac: true,
    price: 14,
    features: ["Air Conditioned", "Music System", "GPS Tracked", "Spacious Boot"],
    icon: "🚙",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 3,
    name: "SUV",
    model: "Ertiga / XL6",
    capacity: 6,
    luggage: "4 bags",
    ac: true,
    price: 18,
    features: ["Air Conditioned", "Music System", "GPS Tracked", "High Ground Clearance"],
    icon: "🚐",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 4,
    name: "Innova Crysta",
    model: "Toyota Innova 2.8",
    capacity: 7,
    luggage: "5 bags",
    ac: true,
    price: 22,
    features: ["Premium AC", "Captain Seats", "GPS Tracked", "Best for Mountains"],
    icon: "🏔️",
    color: "from-amber-500 to-orange-500",
    popular: true,
  },
  {
    id: 5,
    name: "Tempo Traveller",
    model: "Force Tempo 12-17 Seat",
    capacity: 17,
    luggage: "10 bags",
    ac: true,
    price: 35,
    features: ["Air Conditioned", "Push-back Seats", "GPS Tracked", "Ideal for Groups"],
    icon: "🚌",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    name: "Luxury SUV",
    model: "Fortuner / Scorpio N",
    capacity: 6,
    luggage: "4 bags",
    ac: true,
    price: 32,
    features: ["Premium AC", "Leather Seats", "GPS Tracked", "Sunroof Available"],
    icon: "✨",
    color: "from-rose-500 to-pink-600",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Krishnamurthy",
    location: "Chennai",
    avatar: "PK",
    rating: 5,
    review: "Absolutely outstanding service! Our driver Rajan knew every hidden spot in the Nilgiris. The Innova was spotless and the journey was so comfortable. Nilgiris Explorers made our family vacation unforgettable!",
    package: "Ooty & Coonoor Tour",
    date: "March 2025",
    avatarBg: "from-rose-400 to-pink-500",
  },
  {
    id: 2,
    name: "Arjun Sharma",
    location: "Bangalore",
    avatar: "AS",
    rating: 5,
    review: "Booked the Honeymoon Special package and it exceeded all expectations. Every detail was perfect — the sunrise at Doddabetta, the private boat ride, the candlelight dinner setup. Truly magical!",
    package: "Honeymoon Special",
    date: "February 2025",
    avatarBg: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    location: "United Kingdom",
    avatar: "SM",
    rating: 5,
    review: "We came to Ooty as a group of 12 and the Tempo Traveller package was brilliant. Driver was punctual, vehicle was clean, and they arranged permits for Avalanche Lake which we couldn't have done ourselves.",
    package: "Avalanche Explorer",
    date: "January 2025",
    avatarBg: "from-emerald-400 to-green-500",
  },
  {
    id: 4,
    name: "Rajesh Venkataraman",
    location: "Hyderabad",
    avatar: "RV",
    rating: 5,
    review: "The wildlife safari at Mudumalai was incredible. Saw elephants, deer, and the driver positioned the vehicle perfectly. Fair pricing, no hidden charges. Will definitely use Nilgiris Explorers again!",
    package: "Mudumalai Wildlife",
    date: "April 2025",
    avatarBg: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    name: "Meera Nair",
    location: "Kochi",
    avatar: "MN",
    rating: 5,
    review: "Used them for airport transfer from Coimbatore to Ooty. Driver was waiting with a name board, helped with luggage, and the journey through the Ghat roads was smooth and safe. Very professional!",
    package: "Airport Transfer",
    date: "May 2025",
    avatarBg: "from-violet-400 to-purple-500",
  },
];

export const features = [
  {
    icon: "MapPin",
    title: "Expert Local Guides",
    description: "Our guides are Nilgiris natives — they know every hidden viewpoint, legend, and off-beaten trail.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: "Sparkles",
    title: "Curated Itineraries",
    description: "Every tour is expertly designed to balance iconic landmarks with secret local experiences.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: "Calendar",
    title: "Fully Flexible Plans",
    description: "Change your mind? No problem. Free rescheduling up to 24 hours before your trip.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: "BadgeCheck",
    title: "Transparent Pricing",
    description: "No hidden charges, no commission. The quote we give is exactly what you pay.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: "Users",
    title: "Group Specialists",
    description: "Family trips, honeymoons, corporate outings, school trips — we handle all group sizes perfectly.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: "PhoneCall",
    title: "24/7 Concierge",
    description: "From booking to safe return, our travel concierge is reachable any hour of the day.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: "Shield",
    title: "Safe & Insured Travel",
    description: "All our vehicles are insured, sanitized, and driven by police-verified, experienced professionals.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: "HeadphonesIcon",
    title: "Post-Trip Support",
    description: "Lost something? Need recommendations? We are directly available even after your trip ends.",
    gradient: "from-indigo-500 to-violet-600",
  },
];

export const galleryImages = [
  { src: "/images/real_hero.jpg", alt: "Nilgiris Mountain Landscape", cols: 2, rows: 2 },
  { src: "/images/stunning_toy_train.png", alt: "Historic Nilgiri Mountain Railway Toy Train", cols: 1, rows: 1 },
  { src: "/images/stunning_panoramic_hero.png", alt: "Panoramic View of Coonoor Hills", cols: 1, rows: 1 },
  { src: "/images/stunning_tea_estate.png", alt: "Emerald Tea Estate", cols: 1, rows: 1 },
  { src: "/images/stunning_ooty_lake.png", alt: "Boating at Ooty Lake", cols: 1, rows: 2 },
  { src: "/images/real_hero.jpg", alt: "Sunset over Nilgiris", cols: 2, rows: 1 },
  { src: "/images/stunning_pykara.png", alt: "Ancient Pykara Scenery", cols: 1, rows: 1 },
  { src: "/images/stunning_panoramic_hero.png", alt: "Misty Mountain Road", cols: 1, rows: 1 },
  { src: "/images/real_mudumalai.jpg", alt: "Mudumalai Wildlife Safari", cols: 1, rows: 1 },
  { src: "/images/stunning_botanical.png", alt: "Government Botanical Garden", cols: 1, rows: 1 },
];

export const stats = [
  { value: 10000, label: "Happy Travelers", suffix: "+" },
  { value: 2500, label: "Tours Completed", suffix: "+" },
  { value: 50, label: "Premium Vehicles", suffix: "+" },
  { value: 4.9, label: "Star Rating", suffix: "★", decimals: 1 },
];

export const steps = [
  {
    step: "01",
    title: "Share Your Vision",
    description: "Tell us your dream Nilgiris experience — destinations, dates, group size, and any special wishes.",
    icon: "Smartphone",
  },
  {
    step: "02",
    title: "Get a Free Itinerary",
    description: "We craft a personalised day-by-day itinerary with pricing - directly for you within 2 hours.",
    icon: "Map",
  },
  {
    step: "03",
    title: "Confirm & Relax",
    description: "Approve the plan, make a simple payment, and let us handle every detail from here.",
    icon: "UserCheck",
  },
  {
    step: "04",
    title: "Experience The Magic",
    description: "Your guide and vehicle arrive on time. Explore iconic spots and secret gems with local expertise.",
    icon: "Car",
  },
  {
    step: "05",
    title: "Return With Memories",
    description: "Arrive back refreshed and happy. Share your story — and we'd love a review!",
    icon: "Home",
  },
];
