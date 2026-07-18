export const pickupLocations = [
  { id: "ooty", name: "Ooty", baseDistanceKm: 0, type: "Local" },
  { id: "coonoor", name: "Coonoor", baseDistanceKm: 20, type: "Local" },
  { id: "kotagiri", name: "Kotagiri", baseDistanceKm: 30, type: "Local" },
  { id: "coimbatore", name: "Coimbatore", baseDistanceKm: 85, type: "Hub" },
  { id: "mysore", name: "Mysore", baseDistanceKm: 125, type: "Hub" },
  { id: "bangalore", name: "Bangalore", baseDistanceKm: 275, type: "Hub" }
];

export const accommodationPricing = {
  budget: { id: "budget", name: "Budget", pricePerNight: 2000, description: "Basic clean rooms/homestays" },
  standard: { id: "standard", name: "Standard", pricePerNight: 4000, description: "3-Star hotels with basic amenities" },
  premium: { id: "premium", name: "Premium", pricePerNight: 7000, description: "4-Star resorts with great views" },
  luxury: { id: "luxury", name: "Luxury", pricePerNight: 15000, description: "5-Star properties, heritage stays" }
};

export const foodPricing = {
  budget: { id: "budget", name: "Budget", pricePerPersonPerDay: 500, description: "Local eateries, street food" },
  standard: { id: "standard", name: "Standard", pricePerPersonPerDay: 1000, description: "Casual dining, popular restaurants" },
  premium: { id: "premium", name: "Premium", pricePerPersonPerDay: 2000, description: "Fine dining, resort restaurants" },
  custom: { id: "custom", name: "Custom", pricePerPersonPerDay: 0, description: "Enter your own amount" }
};

export const destinationActivities = {
  ooty: [
    { id: "botanical_garden", name: "Botanical Garden Entry", price: 50, duration: "2 hours" },
    { id: "ooty_lake_boat", name: "Ooty Lake Boating", price: 250, duration: "1 hour" },
    { id: "doddabetta", name: "Doddabetta Peak Entry", price: 20, duration: "1 hour" },
    { id: "toy_train", name: "Toy Train (Ooty-Coonoor)", price: 400, duration: "1.5 hours" }
  ],
  coonoor: [
    { id: "sims_park", name: "Sim's Park Entry", price: 30, duration: "1 hour" },
    { id: "dolphins_nose", name: "Dolphin's Nose Entry", price: 20, duration: "45 mins" },
    { id: "lambs_rock", name: "Lamb's Rock Viewpoint", price: 15, duration: "45 mins" },
    { id: "tea_tasting", name: "Premium Tea Tasting", price: 150, duration: "1 hour" }
  ],
  pykara: [
    { id: "pykara_boat", name: "Pykara Speed Boating", price: 1000, duration: "30 mins" },
    { id: "pykara_falls", name: "Pykara Falls Entry", price: 10, duration: "1 hour" },
    { id: "pine_forest", name: "Pine Forest Entry", price: 10, duration: "45 mins" }
  ],
  mudumalai: [
    { id: "safari_van", name: "Forest Dept Van Safari", price: 340, duration: "1 hour" },
    { id: "safari_jeep", name: "Private Jeep Safari", price: 2500, duration: "2 hours" },
    { id: "elephant_camp", name: "Elephant Camp Entry", price: 30, duration: "45 mins" }
  ]
};
