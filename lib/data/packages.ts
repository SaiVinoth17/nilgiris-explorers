export const tourPackages = [
  {
    id: 8,
    slug: "ooty-coonoor-3-day-package",
    name: "Ooty & Coonoor Explorer Package – 3 Days",
    description: "A comprehensive 3-day premium tour covering the finest attractions in Ooty, the scenic Pykara circuit, and the misty hills of Coonoor.",
    highlights: ["Doddabetta Peak", "Pykara Waterfalls", "Dolphin's Nose", "Tea Factory & Museum", "Pine Forest", "Heritage Train"],
    duration: "3 Days / 2 Nights",
    price: 8999,
    distance: "350+ km covered",
    originalPrice: 12000,
    pricingTiers: {
      budget: 8999,
      standard: 11999,
      premium: 16999,
      luxury: 28999
    },
    advancedPricing: {
      weekendSurge: 1500,
      holidaySurge: 3000,
      groupDiscountPercent: 10,
      perPersonSupplement: 2500
    },
    persons: "Up to 4",
    image: "/images/stunning_panoramic_hero.png",
    badge: "Best Seller",
    badgeColor: "emerald",
    includes: ["Hotel Pickup & Drop", "Local Native Guide"],
    exclusions: ["Flight / Train Tickets", "Entry Fees at Monuments/Parks", "Personal Expenses", "Meals not mentioned"],
    faqs: [
      { question: "Is the toy train ticket included?", answer: "Toy train tickets are subject to availability and need to be booked separately on the IRCTC portal well in advance. We provide drop and pickup at the stations." },
      { question: "Can we customize the itinerary?", answer: "Yes, this is a private tour so the itinerary is highly flexible based on your preferences and time constraints." }
    ],
    vehicleDetails: "Premium A/C Sedan or SUV (Innova/Ertiga) based on group size.",
    pickupInfo: "Complimentary pickup from Coimbatore Airport/Station or any hotel in Ooty/Coonoor.",
    dropInfo: "Drop-off at Coimbatore Airport/Station or your requested location.",
    meals: "Breakfast included if booking with accommodation.",
    bestSeason: "September to June.",
    difficultyLevel: "Easy - Suitable for all ages.",
    familySuitability: "Highly suitable for families and young children.",
    coupleSuitability: "Great for couples looking for a relaxed, comprehensive tour.",
    childFriendlyNotes: "Frequent stops available. Please let us know if a child seat is required.",
    thingsToCarry: ["Warm clothing", "Comfortable walking shoes", "Umbrella", "Camera", "Motion sickness pills if prone to ghat road sickness"],
    itinerary: [
      {
        day: "Day 1",
        title: "Ooty Local Sightseeing",
        description: "Explore the highest peaks and the most colorful gardens of the Queen of Hill Stations.",
        locations: [
          "Doddabetta Peak",
          "Tea Factory and Museum",
          "Wax Museum",
          "Botanical Garden",
          "Rose Garden",
          "Ooty Lake (Boathouse)"
        ]
      },
      {
        day: "Day 2",
        title: "Pykara Scenic Tour",
        description: "Drive through stunning pine forests and rolling grasslands towards the spectacular Pykara waterfalls.",
        locations: [
          "Golf Links (Outside View)",
          "Pine Forest",
          "Kamaraj Sagar Dam",
          "School Mund",
          "9th Mile Shooting Place",
          "Pykara Water Falls",
          "Pykara Boat House"
        ]
      },
      {
        day: "Day 3",
        title: "Coonoor Heritage Tour",
        description: "Experience the heritage charm of Coonoor with its misty viewpoints and sprawling tea estates.",
        locations: [
          "Valley View Point",
          "MRC (Outside View)",
          "Golf Links (Outside View)",
          "Sim's Park",
          "Tea Garden",
          "Lamb's Rock",
          "Dolphin Nose"
        ]
      }
    ]
  },
  {
    id: 1,
    slug: "ooty-sightseeing-package",
    name: "Ooty Sightseeing Package",
    description: "Explore the most beautiful and iconic attractions of Ooty in a single day.",
    highlights: ["Doddabetta Peak", "Botanical Garden", "Boat House", "Rose Garden", "Tea Factory"],
    duration: "1 Day (10 hrs)",
    price: 1999,
    originalPrice: 2500,
    pricingTiers: {
      budget: 1999,
      standard: 2799,
      premium: 3999,
      luxury: 6999
    },
    persons: "Up to 4",
    image: "/images/tour_ooty.jpg",
    badge: "Popular",
    badgeColor: "blue",
    includes: ["Free Bus Stand Pickup", "Experienced Local Driver"],
    exclusions: ["Entry Fees at Monuments/Parks", "Personal Expenses", "Meals", "Guide Fees"],
    faqs: [
      { question: "What is the duration of this tour?", answer: "The tour typically lasts 8 to 10 hours depending on the traffic and time spent at each location." },
      { question: "Is hotel pickup available?", answer: "Yes, complimentary pickup is provided from hotels within a 3km radius of Ooty Bus Stand." }
    ],
    vehicleDetails: "A/C Hatchback (Swift/i10) or Sedan (Dzire) for up to 4 persons.",
    pickupInfo: "Any location within Ooty municipal limits.",
    dropInfo: "Same as pickup location or Ooty Bus Stand.",
    meals: "Not included. Driver will stop at good local restaurants.",
    bestSeason: "Year-round.",
    difficultyLevel: "Easy.",
    familySuitability: "Perfect for families.",
    coupleSuitability: "Very suitable.",
    childFriendlyNotes: "Prams can be used in Botanical and Rose gardens.",
    thingsToCarry: ["Sunscreen", "Light jacket", "Water bottle", "Cash for entry tickets"],
    itinerary: [
      {
        day: "Day 1",
        title: "Ooty Core Sightseeing",
        description: "A full day exploring the botanical marvels and scenic heights of Ooty.",
        locations: [
          "Doddabetta Peak",
          "Tea Factory and Museum",
          "Wax Museum",
          "Botanical Garden",
          "Rose Garden",
          "Ooty Lake (Boathouse)",
          "Thread Garden"
        ]
      }
    ]
  },
  {
    id: 2,
    slug: "pykara-sightseeing-package",
    name: "Pykara Sightseeing Package",
    description: "Discover the breathtaking beauty of Pykara waterfalls and pristine pine forests.",
    highlights: ["Pykara Waterfalls", "Pine Forest", "9th Mile", "Kamaraj Sagar Dam", "Pykara Boat House"],
    duration: "1 Day (10 hrs)",
    price: 2499,
    originalPrice: 3200,
    pricingTiers: {
      budget: 2499,
      standard: 3499,
      premium: 4999,
      luxury: 8499
    },
    persons: "Up to 4",
    image: "/images/stunning_pykara.png",
    badge: "Nature",
    badgeColor: "emerald",
    includes: ["Local Map Guide", "Clean A/C Vehicle"],
    exclusions: ["Boating Fees at Pykara", "Entry Fees", "Personal Expenses", "Meals"],
    faqs: [
      { question: "Can we swim in Pykara Lake?", answer: "No, swimming is strictly prohibited by the Forest Department. However, speed boating is available." },
      { question: "Is the pine forest safe for families?", answer: "Yes, the 6th Mile Pine Forest is a very popular and safe tourist spot." }
    ],
    vehicleDetails: "A/C Sedan or SUV depending on group size.",
    pickupInfo: "Pickup from your hotel in Ooty.",
    dropInfo: "Drop back at your hotel in Ooty.",
    meals: "Not included. Limited food options on this route, consider carrying packed lunch.",
    bestSeason: "August to January for best waterfall flow.",
    difficultyLevel: "Moderate (requires some walking near the waterfalls).",
    familySuitability: "Good, but involves walking down to the falls.",
    coupleSuitability: "Highly recommended. Very romantic locations.",
    childFriendlyNotes: "Keep children close near the lake and waterfalls.",
    thingsToCarry: ["Walking shoes", "Snacks and water", "Camera", "Umbrella"],
    itinerary: [
      {
        day: "Day 1",
        title: "Pykara Scenic Circuit",
        description: "Drive through the rolling downs and pristine forests of the Pykara route.",
        locations: [
          "Golf Links (Outside View)",
          "6th Mile Pine Forest",
          "Kamaraj Sagar Dam",
          "School Mund",
          "9th Mile Shooting Spot",
          "Pykara Waterfalls",
          "Pykara Boat House"
        ]
      }
    ]
  },
  {
    id: 9,
    slug: "coonoor-sightseeing-package",
    name: "Coonoor Sightseeing Package",
    description: "Experience the heritage charm of Coonoor with its misty viewpoints and sprawling tea estates.",
    highlights: ["Sim's Park", "Dolphin's Nose", "Lamb's Rock", "Valley View Point", "Tea Garden"],
    duration: "1 Day (10 hrs)",
    price: 2499,
    originalPrice: 3000,
    pricingTiers: {
      budget: 2499,
      standard: 3499,
      premium: 4999,
      luxury: 8499
    },
    persons: "Up to 4",
    image: "/images/stunning_panoramic_hero.png",
    badge: "Heritage",
    badgeColor: "amber",
    includes: ["Local Map Guide", "Professional Driver"],
    exclusions: ["Entry Fees", "Personal Expenses", "Meals"],
    faqs: [
      { question: "Is the road to Dolphin's Nose safe?", answer: "Yes, our drivers are highly experienced in navigating the steep and narrow ghat roads of Coonoor safely." }
    ],
    vehicleDetails: "A/C Sedan. SUVs are not recommended for some narrow Coonoor roads but can be arranged.",
    pickupInfo: "Pickup from Ooty or Coonoor hotel.",
    dropInfo: "Drop back at hotel.",
    meals: "Not included.",
    bestSeason: "September to April.",
    difficultyLevel: "Easy.",
    familySuitability: "Very suitable.",
    coupleSuitability: "Very suitable.",
    childFriendlyNotes: "Sim's park is great for kids.",
    thingsToCarry: ["Motion sickness pills", "Warm jacket", "Camera"],
    itinerary: [
      {
        day: "Day 1",
        title: "Coonoor Heritage Circuit",
        description: "Discover the spectacular viewpoints and lush tea estates of Coonoor.",
        locations: [
          "Valley View Point",
          "MRC (Outside View)",
          "Golf Links",
          "Sim's Park",
          "Tea Garden",
          "Lamb's Rock",
          "Dolphin's Nose"
        ]
      }
    ]
  },
  {
    id: 3,
    slug: "honeymoon-special-standard",
    name: "Honeymoon Special (Standard)",
    description: "Create beautiful memories with a highly romantic and private tour designed for couples.",
    highlights: ["Rose Garden Walk", "Private Boat Ride", "Sunset at Doddabetta", "Romantic Campfire Setup"],
    duration: "2 Days / 1 Night",
    price: 9999,
    originalPrice: 14000,
    pricingTiers: {
      budget: 9999,
      standard: 13999,
      premium: 19999,
      luxury: 32999
    },
    persons: "2 Persons (Couple)",
    image: "/images/tour_doddabetta_view.jpg",
    badge: "Romantic",
    badgeColor: "rose",
    includes: ["Standard Hotel Stay", "Breakfast Included", "Surprise Floral Welcome", "Private Cab"],
    exclusions: ["Lunch and Dinner", "Entry tickets", "Flight/Train fare"],
    vehicleDetails: "A/C Premium Sedan dedicated for the couple.",
    pickupInfo: "Coimbatore or Ooty pickup.",
    dropInfo: "Coimbatore or Ooty drop.",
    meals: "Breakfast included. Other meals extra.",
    bestSeason: "September to May.",
    difficultyLevel: "Easy.",
    familySuitability: "Designed for couples, not families.",
    coupleSuitability: "Perfect. Tailor-made for honeymoons.",
    childFriendlyNotes: "N/A",
    thingsToCarry: ["Warm romantic wear", "Camera"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Romantic Evening",
        description: "Arrive in Ooty, check-in to your decorated room, and enjoy a private sunset boat ride.",
        locations: ["Ooty Lake", "Rose Garden", "Sunset Point"]
      },
      {
        day: "Day 2",
        title: "Highland Exploration",
        description: "Explore the highest peaks and dense pine forests before departure.",
        locations: ["Doddabetta Peak", "Pine Forest", "Tea Estate"]
      }
    ]
  },
  {
    id: 4,
    slug: "honeymoon-special-luxury",
    name: "Honeymoon Special (Luxury)",
    description: "An ultra-premium, all-inclusive luxury romantic getaway through Ooty's misty paradise.",
    highlights: ["Tea Estate Private Walk", "VIP Boat Cruise", "Luxury Valley View Resort", "Candlelight Dinner"],
    duration: "3 Days / 2 Nights",
    price: 49999,
    originalPrice: 65000,
    pricingTiers: {
      luxury: 49999
    },
    persons: "2 Persons (Couple)",
    image: "/images/stunning_tea_estate.png",
    badge: "Premium Luxury",
    badgeColor: "rose",
    includes: ["5-Star Resort Stay", "All Meals & Decor", "Private Guide Assistance", "Luxury SUV"],
    exclusions: ["Flight/Train fare"],
    vehicleDetails: "Luxury SUV (Innova Crysta/Fortuner) or Premium Sedan.",
    pickupInfo: "Coimbatore Airport/Station VIP Pickup.",
    dropInfo: "Coimbatore Airport/Station VIP Drop.",
    meals: "All meals included (Breakfast, Lunch, Dinner).",
    bestSeason: "Year-round.",
    difficultyLevel: "Easy.",
    familySuitability: "Designed for couples.",
    coupleSuitability: "Ultimate romantic experience.",
    childFriendlyNotes: "N/A",
    thingsToCarry: ["Evening wear for dinners", "Warm clothes"],
    itinerary: [
      {
        day: "Day 1",
        title: "Welcome to Paradise",
        description: "VIP transfer to a 5-star resort. Evening couples spa session and candlelight dinner.",
        locations: ["Luxury Resort", "Private Spa"]
      },
      {
        day: "Day 2",
        title: "Exclusive Nilgiris",
        description: "Private guided tour of a tea estate followed by a VIP boat cruise.",
        locations: ["Private Tea Estate", "Ooty Boat House (VIP)"]
      },
      {
        day: "Day 3",
        title: "Heritage & Departure",
        description: "Heritage toy train experience before departing.",
        locations: ["Nilgiri Mountain Railway", "Coimbatore"]
      }
    ]
  },
  {
    id: 5,
    slug: "friends-family-group-package",
    name: "Friends & Family Group Package",
    description: "The perfect group package for friends or families traveling together. Fun, flexible, and affordable.",
    highlights: ["Mudumalai Safari", "Pykara Boat House", "Campfire with Music", "Trekking & Hiking Trails"],
    duration: "3 Days / 2 Nights",
    price: 3499,
    originalPrice: 5000,
    pricingTiers: {
      budget: 3499,
      standard: 4999,
      premium: 6999
    },
    persons: "Per Head (Min 6)",
    image: "/images/real_innova.jpg",
    badge: "Group Tour",
    badgeColor: "purple",
    includes: ["Homestay Accommodation", "Local Hiking Guide", "Tempo Traveller/Innova", "Campfire"],
    exclusions: ["Entry Fees", "Lunch"],
    vehicleDetails: "Tempo Traveller (12-17 seater) or Multiple SUVs.",
    pickupInfo: "Coimbatore or Ooty.",
    dropInfo: "Coimbatore or Ooty.",
    meals: "Breakfast and Dinner included at Homestay.",
    bestSeason: "Year-round.",
    difficultyLevel: "Moderate.",
    familySuitability: "Excellent for large families.",
    coupleSuitability: "Better suited for groups.",
    childFriendlyNotes: "Campfire and large spaces for kids to play at the homestay.",
    thingsToCarry: ["Comfortable trekking shoes", "Warm clothes", "Group games/music"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Ooty Town",
        description: "Settle into the homestay and explore local Ooty attractions.",
        locations: ["Botanical Garden", "Doddabetta", "Campfire at Homestay"]
      },
      {
        day: "Day 2",
        title: "Adventure Day",
        description: "Head to Pykara for boating and then Mudumalai for an evening safari.",
        locations: ["Pykara Lake", "Pine Forest", "Mudumalai Safari"]
      },
      {
        day: "Day 3",
        title: "Tea & Departure",
        description: "Visit Coonoor tea estates before heading back.",
        locations: ["Dolphin's Nose", "Tea Factory"]
      }
    ]
  },
  {
    id: 6,
    slug: "adventure-wilderness-special",
    name: "Adventure & Wilderness Special",
    description: "An off-beat, thrilling adventure featuring private jungle jeep safaris and high-altitude trekking.",
    highlights: ["Avalanche Lake Permit", "Mudumalai Forest Safari", "Jungle Trekking", "Bison Valley View"],
    duration: "1 Day (12 hrs)",
    price: 4999,
    originalPrice: 6500,
    pricingTiers: {
      standard: 4999,
      premium: 7999
    },
    persons: "Per Head (Min 4)",
    image: "/images/real_mudumalai.jpg",
    badge: "Adventure",
    badgeColor: "orange",
    includes: ["Jungle Guide Fee", "Avalanche Entry Permits", "Packed Picnic Lunch", "4x4 Jeep"],
    exclusions: ["Personal Expenses"],
    vehicleDetails: "4x4 Jeep (Mahindra Thar/Bolero) suitable for rough terrains.",
    pickupInfo: "Ooty Hotel.",
    dropInfo: "Ooty Hotel.",
    meals: "Packed Picnic Lunch included.",
    bestSeason: "Post-monsoon (September to March).",
    difficultyLevel: "Hard - Requires physical fitness for trekking.",
    familySuitability: "Not recommended for young children or elderly.",
    coupleSuitability: "Great for adventurous couples.",
    childFriendlyNotes: "Strictly for adults and older teenagers due to safety reasons.",
    thingsToCarry: ["Trekking boots", "Camouflage/Earthy tone clothes", "Binoculars", "Water bottles"],
    itinerary: [
      {
        day: "Day 1",
        title: "Deep into the Wild",
        description: "A rugged jeep ride to Avalanche Lake followed by an evening wildlife trek.",
        locations: ["Avalanche Lake", "Emerald Dam", "Bison Valley", "Secret Jungle Trail"]
      }
    ]
  }
];
