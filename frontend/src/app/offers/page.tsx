"use client";

import { PosterDTO } from "@/app/dto/PosterDTO";
import Link from "next/link";
import { useEffect, useState } from "react";

import OfferCard from "../../components/offerComponent";
export default function OffersPage() {
  const [offers, setOffers] = useState<PosterDTO[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/posters")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error("Failed to fetch posters", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Offers</h1>

      {offers.length === 0 ? (
        <p className="text-gray-500">No posters available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((poster) => (
            <OfferCard key={poster.posterId} poster={poster} />
          ))}
        </div>
      )}
    </div>
  );
}
