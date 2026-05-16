// ============================================================
// HotelCard.jsx — Displays a single hotel as a card
// Props: hotel object passed from parent component
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <div
      className="hotel-card bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      {/* Hotel Image */}
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-52 object-cover"
          onError={(e) => {
            // If image fails to load, show a placeholder
            e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";
          }}
        />
        {/* Badge showing hotel type */}
        <span className="absolute top-3 left-3 bg-navy-900 text-gold-400 text-xs font-semibold px-3 py-1 rounded-full">
          {hotel.type}
        </span>
        {/* Availability badge */}
        {!hotel.available && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Unavailable
          </span>
        )}
      </div>

      {/* Hotel Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display font-bold text-navy-900 text-lg leading-tight">
            {hotel.name}
          </h3>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm mb-3">
          📍 {hotel.location}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-gold-500 text-sm">★</span>
          <span className="font-semibold text-navy-900 text-sm">{hotel.rating}</span>
          <span className="text-gray-400 text-sm">({hotel.reviews} reviews)</span>
        </div>

        {/* Amenities (show first 3) */}
        <div className="flex gap-2 flex-wrap mb-4">
          {hotel.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-full">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-navy-900">₹{hotel.price.toLocaleString()}</span>
            <span className="text-gray-400 text-sm"> / night</span>
          </div>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              hotel.available
                ? "bg-gold-400 hover:bg-gold-500 text-navy-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {hotel.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
