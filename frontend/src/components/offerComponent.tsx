"use client";

import { PosterDTO } from "@/app/dto/PosterDTO";
import Link from "next/link";
interface PosterCardProps {
  poster: PosterDTO;
}

export default function PosterCard({ poster }: PosterCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* Image */}
      <img
        src={poster.imageUrl || "/placeholder.jpg"}
        alt={poster.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{poster.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {poster.description}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <Link
            href={`/offers/${poster.posterId}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>

          <Link
            href={`/offers/${poster.posterId}/contact`}
            className="text-green-600 hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
