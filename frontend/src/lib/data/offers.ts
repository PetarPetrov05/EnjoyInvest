import axios from "axios";

const API_BASE = "http://localhost:8080";

const API = axios.create({
  baseURL: API_BASE,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("enjoy-transport-token");
  if (token) {
    if (config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

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

const API_URL = "/posters";

let offersCache: Offer[] = [];

export async function getOffers(): Promise<Offer[]> {
  if (offersCache.length > 0) return offersCache;

  const response = await API.get(API_URL);
  offersCache = response.data;
  return offersCache;
}

export async function getOfferById(id: number): Promise<Offer> {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
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

// Create a poster (requires auth). The JWT is attached automatically by the interceptor.
export async function createPoster(posterData: Partial<Offer>) {
  const response = await API.post(API_URL, posterData);
  // invalidate cache so next getOffers fetches updated data
  offersCache = [];
  return response.data;
}
export async function deletePoster(id: number): Promise<void> {
  await API.delete(`${API_URL}/${id}`);
  // Clear cache so UI gets fresh data next time
  offersCache = [];
}