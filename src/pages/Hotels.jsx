// ============================================================
// Hotels.jsx — Shows ALL hotels with search + filter functionality
// useSearchParams reads URL query params like ?location=Goa
// ============================================================

import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { hotels as staticHotels, locations, hotelTypes } from "../data/hotels";
import { useBooking } from "../context/BookingContext";
import HotelCard from "../components/HotelCard";

export default function Hotels() {
  // useSearchParams reads the URL like /hotels?location=Goa
  const [searchParams] = useSearchParams();
  const { listings } = useBooking(); // partner-added hotels

  // Combine static hotels + admin-added listings
  const allHotels = [...staticHotels, ...listings];

  // State for filters — initialized from URL params if they exist
  const [search, setSearch] = useState(searchParams.get("location") || "");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("rating"); // 'rating', 'price-low', 'price-high'

  // useMemo only recalculates when filters change (performance optimization)
  const filtered = useMemo(() => {
    let result = allHotels;

    // Filter by text search
    if (search.trim()) {
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(search.toLowerCase()) ||
          h.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by location dropdown
    if (selectedLocation !== "All") {
      result = result.filter((h) => h.location === selectedLocation);
    }

    // Filter by type
    if (selectedType !== "All") {
      result = result.filter((h) => h.type === selectedType);
    }

    // Filter by max price
    result = result.filter((h) => h.price <= maxPrice);

    // Sort
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedLocation, selectedType, maxPrice, sortBy, allHotels]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">Browse Hotels</h1>
      <p className="text-gray-500 mb-8">{filtered.length} hotels found</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── SIDEBAR FILTERS ── */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
            <h2 className="font-display font-bold text-navy-900 text-lg mb-5">Filters</h2>

            {/* Search */}
            <div className="mb-5">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 block">Search</label>
              <input
                type="text"
                placeholder="Hotel or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400"
              />
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 block">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400"
              >
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>

            {/* Type */}
            <div className="mb-5">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 block">Hotel Type</label>
              <div className="flex flex-wrap gap-2">
                {hotelTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      selectedType === t
                        ? "bg-navy-900 text-gold-400 border-navy-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gold-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 block">
                Max Price: ₹{maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹2,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400"
              >
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Reset filters */}
            <button
              onClick={() => {
                setSearch("");
                setSelectedLocation("All");
                setSelectedType("All");
                setMaxPrice(10000);
                setSortBy("rating");
              }}
              className="mt-5 w-full text-sm text-gray-500 hover:text-navy-900 underline transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* ── HOTEL GRID ── */}
        <main className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🏨</div>
              <p className="text-lg font-medium">No hotels found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
