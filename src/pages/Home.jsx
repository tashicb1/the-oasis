// ============================================================
// Home.jsx — Landing page
// Shows a hero section with search, and featured hotels below.
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotels } from "../data/hotels";
import HotelCard from "../components/HotelCard";

export default function Home() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // When user clicks Search button
  const handleSearch = () => {
    // Navigate to /hotels with search params in URL
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    navigate(`/hotels?${params.toString()}`);
  };

  // Show only the first 3 hotels as "featured"
  const featured = hotels.slice(0, 3);

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,22,35,0.65), rgba(15,22,35,0.75)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-4 fade-in max-w-3xl">
          <p className="text-gold-400 font-body font-medium text-sm tracking-widest uppercase mb-4">
            Premium Hotel Booking
          </p>
          <h1 className="font-display text-white text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Your Perfect
            <span className="text-gold-400"> Stay</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 font-body">
            Discover handpicked luxury hotels, beach resorts, mountain retreats, and heritage palaces across India.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-4 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Location input */}
            <div className="flex flex-col text-left">
              <label className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">
                Destination
              </label>
              <input
                type="text"
                placeholder="City or Hotel"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="text-navy-900 font-medium outline-none text-sm"
              />
            </div>

            {/* Check-in */}
            <div className="flex flex-col text-left border-t md:border-t-0 md:border-l border-gray-200 md:pl-3 pt-2 md:pt-0">
              <label className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">
                Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="text-navy-900 font-medium outline-none text-sm"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col text-left border-t md:border-t-0 md:border-l border-gray-200 md:pl-3 pt-2 md:pt-0">
              <label className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">
                Check-Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-navy-900 font-medium outline-none text-sm"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 px-6 rounded-xl transition w-full"
            >
              🔍 Search
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="bg-navy-900 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
          {[
            { number: "500+", label: "Hotels" },
            { number: "50+", label: "Cities" },
            { number: "10K+", label: "Happy Guests" },
            { number: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-gold-400 text-3xl font-bold">{stat.number}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED HOTELS ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-1">Top Picks</p>
            <h2 className="font-display text-navy-900 text-3xl font-bold">Featured Hotels</h2>
          </div>
          <button
            onClick={() => navigate("/hotels")}
            className="text-navy-900 border-2 border-navy-900 hover:bg-navy-900 hover:text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display text-navy-900 text-3xl font-bold mb-2">Why LuxeStay?</h2>
          <p className="text-gray-500 mb-12">Everything you need for a perfect hotel experience</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🔒", title: "Secure Booking", desc: "Your payments and personal data are always protected." },
              { icon: "💰", title: "Best Prices", desc: "We guarantee the best rates — no hidden charges." },
              { icon: "🛎️", title: "24/7 Support", desc: "Our team is always available to help you." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-gold-400/10 transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-navy-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-gray-400 text-center py-6 text-sm">
        © 2025 LuxeStay. Built with React.js, Tailwind CSS & Clerk.
      </footer>
    </div>
  );
}
