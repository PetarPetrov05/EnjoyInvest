export interface Offer {
  id: number
  title: string
  description: string
  fullDescription: string
  price: string
  type: "For Rent" | "For Sale" | "Trip"
  category: string
  image: string
  images: string[]
  likes: number
  comments: Comment[]
  saved: boolean
  specifications?: Record<string, string>
  location: string
    phone: string
    email: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
  avatar?: string
}

// Mock data for offers
export const offers: Offer[] = [
  {
    id: 1,
    title: "Heavy Duty Truck - Ford F-350",
    description: "Perfect for construction and heavy hauling. Excellent condition with low mileage.",
    fullDescription:
      "This Ford F-350 Super Duty is perfect for heavy-duty work and construction projects. With its powerful engine and robust build quality, it can handle the toughest jobs while maintaining reliability and comfort. The truck has been well-maintained with regular service records and is ready for immediate use.",
    price: "$150/day",
    type: "For Rent",
    category: "Heavy Duty",
    image: "/heavy-duty-truck-ford.jpg",
    images: ["/heavy-duty-truck-ford.jpg", "/heavy-duty-truck.jpg"],
    likes: 24,
    comments: [
      {
        id: 1,
        author: "John Smith",
        content: "Great truck! Used it for my construction project last month. Very reliable.",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        content: "Perfect for moving heavy equipment. Highly recommend!",
        createdAt: "2024-01-14T15:45:00Z",
      },
    ],
    saved: false,
    specifications: {
      Engine: "6.7L V8 Turbo Diesel",
      Transmission: "10-Speed Automatic",
      Payload: "7,640 lbs",
      "Towing Capacity": "37,000 lbs",
      "Fuel Type": "Diesel",
      Year: "2022",
    },
    location: "Downtown Depot",
      phone: "+1 (555) 123-4567",
      email: "rentals@enjoytransport.com",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: 2,
    title: "Organized Trip to Mountain Resort",
    description: "3-day luxury transport trip with accommodation and meals included.",
    fullDescription:
      "Experience the beauty of the mountains with our luxury 3-day transport package. This all-inclusive trip includes comfortable coach transportation, luxury accommodation at a 4-star mountain resort, all meals, and guided tours of scenic locations. Perfect for groups, families, or corporate retreats looking for a memorable getaway.",
    price: "$299/person",
    type: "Trip",
    category: "Tourism",
    image: "/mountain-resort-bus-trip.jpg",
    images: ["/mountain-resort-bus-trip.jpg", "/city-tour-bus.jpg"],
    likes: 45,
    comments: [
      {
        id: 3,
        author: "Mike Wilson",
        content: "Amazing trip! The views were spectacular and the service was top-notch.",
        createdAt: "2024-01-12T09:15:00Z",
      },
      {
        id: 4,
        author: "Lisa Chen",
        content: "Perfect for our company retreat. Everyone loved it!",
        createdAt: "2024-01-11T14:20:00Z",
      },
    ],
    saved: true,
    specifications: {
      Duration: "3 Days / 2 Nights",
      "Group Size": "15-45 passengers",
      Accommodation: "4-Star Mountain Resort",
      Meals: "All meals included",
      Activities: "Guided tours, hiking, scenic drives",
      Departure: "Every Saturday",
    },
    location: "Main Terminal",
      phone: "+1 (555) 123-4568",
      email: "trips@enjoytransport.com",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-12T16:30:00Z",
  },
  {
    id: 3,
    title: "Commercial Van - Mercedes Sprinter",
    description: "Excellent condition, low mileage, perfect for business deliveries.",
    fullDescription:
      "This Mercedes Sprinter van is ideal for businesses looking for reliable commercial transportation. With low mileage and excellent maintenance history, it offers superior fuel efficiency and cargo capacity. The van features modern safety systems, comfortable driver ergonomics, and a spacious cargo area perfect for deliveries, service calls, or mobile business operations.",
    price: "$45,000",
    type: "For Sale",
    category: "Commercial",
    image: "/mercedes-sprinter-van.jpg",
    images: ["/mercedes-sprinter-van.jpg"],
    likes: 18,
    comments: [
      {
        id: 5,
        author: "David Brown",
        content: "Interested in this van. Can I schedule a test drive?",
        createdAt: "2024-01-13T11:00:00Z",
      },
    ],
    saved: false,
    specifications: {
      Year: "2021",
      Mileage: "45,000 miles",
      Engine: "2.0L 4-Cylinder Turbo",
      Transmission: "9-Speed Automatic",
      "Cargo Volume": "319 cubic feet",
      "Fuel Economy": "21 city / 24 highway MPG",
    },
    location: "Sales Lot A",
      phone: "+1 (555) 123-4569",
      email: "sales@enjoytransport.com",
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
  },
  {
    id: 4,
    title: "Pickup Truck - Toyota Tacoma",
    description: "Reliable pickup truck for everyday use and light hauling.",
    fullDescription:
      "The Toyota Tacoma is renowned for its reliability and versatility. This mid-size pickup truck is perfect for both personal and light commercial use. Whether you need it for weekend projects, camping trips, or light hauling, the Tacoma delivers excellent performance with outstanding fuel economy and proven durability.",
    price: "$80/day",
    type: "For Rent",
    category: "Light Duty",
    image: "/toyota-tacoma-pickup-truck.jpg",
    images: ["/toyota-tacoma-pickup-truck.jpg"],
    likes: 32,
    comments: [
      {
        id: 6,
        author: "Jennifer Lee",
        content: "Perfect truck for my weekend camping trips. Very comfortable and reliable.",
        createdAt: "2024-01-14T16:45:00Z",
      },
    ],
    saved: false,
    specifications: {
      Engine: "3.5L V6",
      Transmission: "6-Speed Automatic",
      Payload: "1,685 lbs",
      "Towing Capacity": "6,800 lbs",
      "Fuel Type": "Gasoline",
      Year: "2023",
    },
    location: "North Branch",
      phone: "+1 (555) 123-4567",
      email: "rentals@enjoytransport.com",
    createdAt: "2024-01-09T12:00:00Z",
    updatedAt: "2024-01-14T17:00:00Z",
  },
  {
    id: 5,
    title: "City Tour Bus Experience",
    description: "Full-day city tour with professional guide and comfortable seating.",
    fullDescription:
      "Discover the city's hidden gems and famous landmarks with our comprehensive city tour experience. Our comfortable, air-conditioned buses feature panoramic windows for optimal sightseeing, professional tour guides with extensive local knowledge, and convenient stops at major attractions. Perfect for tourists, school groups, or corporate team-building events.",
    price: "$89/person",
    type: "Trip",
    category: "Tourism",
    image: "/city-tour-bus.jpg",
    images: ["/city-tour-bus.jpg", "/mountain-resort-bus-trip.jpg"],
    likes: 67,
    comments: [
      {
        id: 7,
        author: "Robert Garcia",
        content: "Excellent tour! Our guide was very knowledgeable and the bus was comfortable.",
        createdAt: "2024-01-13T13:30:00Z",
      },
      {
        id: 8,
        author: "Emily Davis",
        content: "Great way to see the city. Highly recommend for first-time visitors!",
        createdAt: "2024-01-12T10:15:00Z",
      },
    ],
    saved: true,
    specifications: {
      Duration: "8 hours",
      "Group Size": "25-50 passengers",
      Stops: "12 major attractions",
      Guide: "Professional tour guide included",
      Amenities: "AC, panoramic windows, restroom",
      Schedule: "Daily departures at 9 AM",
    },
    location: "Tourist Center",
      phone: "+1 (555) 123-4568",
      email: "trips@enjoytransport.com",
    createdAt: "2024-01-07T09:00:00Z",
    updatedAt: "2024-01-13T14:00:00Z",
  },
  {
    id: 6,
    title: "Box Truck - Isuzu NPR",
    description: "Perfect for moving and delivery services. Well-maintained and reliable.",
    fullDescription:
      "This Isuzu NPR box truck is the ideal solution for moving services, delivery businesses, and commercial transportation needs. With its spacious cargo area, reliable diesel engine, and excellent maneuverability in urban environments, it's perfect for businesses looking to expand their fleet or individuals starting a delivery service.",
    price: "$28,500",
    type: "For Sale",
    category: "Commercial",
    image: "/isuzu-box-truck.jpg",
    images: ["/isuzu-box-truck.jpg"],
    likes: 12,
    comments: [
      {
        id: 9,
        author: "Carlos Rodriguez",
        content: "Looking for a reliable box truck for my delivery business. This looks perfect!",
        createdAt: "2024-01-15T08:45:00Z",
      },
    ],
    saved: false,
    specifications: {
      Year: "2020",
      Mileage: "78,000 miles",
      Engine: "5.2L Diesel",
      Transmission: "6-Speed Manual",
      "Cargo Box": "14 ft x 7 ft x 7 ft",
      GVWR: "14,500 lbs",
    },
    location: "Sales Lot B",
      phone: "+1 (555) 123-4569",
      email: "sales@enjoytransport.com",
    createdAt: "2024-01-06T11:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
]

// Helper functions
export function getOfferById(id: number): Offer | undefined {
  return offers.find((offer) => offer.id === id)
}

export function getOffersByType(type: string): Offer[] {
  if (type === "all") return offers
  return offers.filter((offer) => offer.type === type)
}

export function getOffersByCategory(category: string): Offer[] {
  if (category === "all") return offers
  return offers.filter((offer) => offer.category === category)
}

export function searchOffers(query: string): Offer[] {
  const lowercaseQuery = query.toLowerCase()
  return offers.filter(
    (offer) =>
      offer.title.toLowerCase().includes(lowercaseQuery) ||
      offer.description.toLowerCase().includes(lowercaseQuery) ||
      offer.category.toLowerCase().includes(lowercaseQuery),
  )
}
