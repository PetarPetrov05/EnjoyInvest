import axios from "axios";

const API_URL = "http://localhost:8080/posters";

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  type: "For Rent" | "For Sale" | "Trip";
  category: string;
  image: string;
  images: string[];
  likes: number;
  comments: Comment[];
  saved: boolean;
  specifications?: Record<string, string>;
  location: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

let offersCache: Offer[] = [];

export async function getOffers(): Promise<Offer[]> {
  if (offersCache.length > 0) return offersCache; 

  const response = await axios.get(API_URL);
  offersCache = response.data;
  return offersCache;
}

export async function getOffersByType(type: string): Promise<Offer[]> {
  const offers = await getOffers();
  if (type === "all") return offers;
  return offers.filter((offer) => offer.type === type);
}

export async function getOffersByCategory(category: string): Promise<Offer[]> {
  const offers = await getOffers();
  if (category === "all") return offers;
  return offers.filter((offer) => offer.category === category);
}

export async function searchOffers(query: string): Promise<Offer[]> {
  const offers = await getOffers();
  const lowercaseQuery = query.toLowerCase();
  return offers.filter(
    (offer) =>
      offer.title.toLowerCase().includes(lowercaseQuery) ||
      offer.description.toLowerCase().includes(lowercaseQuery) ||
      offer.category.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getOfferById(id: number): Promise<Offer> {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(` Failed to fetch offer with ID ${id}`, error);
    throw error;
  }
}
