import axios from "axios";

export const BACKEND_URL = (typeof window !== "undefined")
  ? `${window.location.protocol}//${window.location.hostname}:8080`
  : "http://localhost:8080";

const API = axios.create({
  baseURL: BACKEND_URL,
});

// Interceptor: attach JWT to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("enjoy-transport-token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    console.log("AUTH HEADER SET:", config.headers.Authorization);
  }
  return config;
});

// Types
export interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
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
  isLiked?: boolean;
  specifications?: Record<string, string>;
  location: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "/posters";

let offersCache: Offer[] = [];

// GET all posters
export async function getOffers(): Promise<Offer[]> {
  if (offersCache.length > 0) return offersCache;
  const response = await API.get(API_URL);
  offersCache = response.data;
  return offersCache;
}

// GET poster by ID
export async function getOfferById(id: number): Promise<Offer> {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
}

// Filter by type
export async function getOffersByType(type: string): Promise<Offer[]> {
  const offers = await getOffers();
  if (type === "all") return offers;
  return offers.filter((offer) => offer.type === type);
}

// Filter by category
export async function getOffersByCategory(category: string): Promise<Offer[]> {
  const offers = await getOffers();
  if (category === "all") return offers;
  return offers.filter((offer) => offer.category === category);
}

// Search offers
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

// CREATE a new poster
export async function createPoster(posterData: FormData) {
  try {
    const response = await API.post(API_URL, posterData);
    offersCache = [];
    return response.data;
  } catch (error: any) {
    console.error("Failed to create poster:", error);
    throw error;
  }
}

// DELETE a poster
export async function deletePoster(id: number): Promise<void> {
  try {
    await API.delete(`${API_URL}/${id}`);
    offersCache = [];
  } catch (error: any) {
    console.error("Failed to delete poster:", error);
    throw error;
  }
}

// UPDATE a poster
export async function updateOffer(id: number, offerData: FormData) {
  try {
    const response = await API.put(`${API_URL}/${id}`, offerData);
    console.log("Update Response:", response.data);
    offersCache = [];
    return response.data;
  } catch (error: any) {
    console.error("Failed to update offer:", error);
    throw error;
  }
}

// LIKE/UNLIKE a poster
export async function toggleLikeOffer(id: number): Promise<boolean> {
  try {
    const response = await API.post(`${API_URL}/${id}/like`);
    offersCache = []; // invalidate cache
    return response.status === 200; // liked if 200, unliked if 204
  } catch (error: any) {
    console.error("Failed to toggle like:", error);
    throw error;
  }
}
// Get comments for a poster
export async function getComments(posterId: number): Promise<Comment[]> {
  const response = await API.get(`/api/comments/${posterId}`);
  return response.data.map((c: any) => ({
    id: c.id,
    username: c.username,
    content: c.content,
    createdAt: c.createdAt,
  }));
}

export async function postComment(posterId: number, content: string): Promise<Comment> {
  const response = await API.post(`api/comments/${posterId}`, { content }); // send JSON object
  return response.data;
}
