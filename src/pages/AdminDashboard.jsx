// ============================================================
// AdminDashboard.jsx — Manage hotels and view all bookings
// In real life this would be restricted to admin users only.
// For now, any logged-in user can access it (for demo purposes).
// ============================================================

import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { hotels as staticHotels, hotelTypes, locations } from "../data/hotels";
import { useBooking } from "../context/BookingContext";

export default function AdminDashboard() {
  const { isSignedIn, user } = useUser();
  const { bookings, cancelBooking, listings, addListing, deleteListing } = useBooking();
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "bookings", "listings", "add"

  // Form state for adding a new hotel
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "Luxury",
    price: "",
    image: "",
    description: "",
    amenities: "",
  });
  const [addSuccess, setAddSuccess] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">🔒</div>
        <p className="font-display text-xl text-navy-900">Sign in to access the dashboard.</p>
      </div>
    );
  }

  const allHotels = [...staticHotels, ...listings];
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed");
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle adding a new listing
  const handleAddListing = () => {
    if (!form.name || !form.location || !form.price) {
      alert("Please fill in the Name, Location, and Price fields.");
      return;
    }

    addListing({
      name: form.name,
      location: form.location,
      type: form.type,
      price: Number(form.price),
      image: form.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      description: form.description || "A wonderful place to stay.",
      amenities: form.amenities ? form.amenities.split(",").map((a) => a.trim()) : ["WiFi"],
      rooms: ["Standard Room", "Deluxe Room"],
    });

    // Reset form
    setForm({ name: "", location: "", type: "Luxury", price: "", image: "", description: "", amenities: "" });
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "bookings", label: `Bookings (${bookings.length})`, icon: "📅" },
    { key: "listings", label: `Listings (${listings.length})`, icon: "🏨" },
    { key: "add", label: "Add Hotel", icon: "➕" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Logged in as {user?.fullName}</p>
        </div>
        <span className="bg-gold-400 text-navy-900 font-semibold text-sm px-4 py-2 rounded-full">
          Partner Portal
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeTab === tab.key
                ? "border-gold-400 text-navy-900"
                : "border-transparent text-gray-500 hover:text-navy-900"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Hotels", value: allHotels.length, icon: "🏨", color: "bg-blue-50" },
              { label: "Total Bookings", value: bookings.length, icon: "📅", color: "bg-green-50" },
              { label: "Confirmed", value: confirmedBookings.length, icon: "✅", color: "bg-yellow-50" },
              { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-purple-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} rounded-2xl p-5 shadow-sm`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="font-display text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent bookings preview */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-display font-bold text-navy-900 text-xl mb-4">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-2 font-semibold">Hotel</th>
                      <th className="pb-2 font-semibold">Guest</th>
                      <th className="pb-2 font-semibold">Dates</th>
                      <th className="pb-2 font-semibold">Total</th>
                      <th className="pb-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...bookings].reverse().slice(0, 5).map((b) => (
                      <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 font-medium text-navy-900">{b.hotelName}</td>
                        <td className="py-3 text-gray-500">{b.guestName}</td>
                        <td className="py-3 text-gray-500">{b.checkIn} → {b.checkOut}</td>
                        <td className="py-3 font-semibold">₹{b.totalPrice?.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            b.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BOOKINGS TAB ── */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-display font-bold text-navy-900 text-xl mb-5">All Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-400">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-200">
                    <th className="pb-3 font-semibold">Hotel</th>
                    <th className="pb-3 font-semibold">Room</th>
                    <th className="pb-3 font-semibold">Guest</th>
                    <th className="pb-3 font-semibold">Check-In</th>
                    <th className="pb-3 font-semibold">Nights</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...bookings].reverse().map((b) => (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-medium text-navy-900">{b.hotelName}</td>
                      <td className="py-3 text-gray-500">{b.roomType}</td>
                      <td className="py-3 text-gray-500">{b.guestName}</td>
                      <td className="py-3 text-gray-500">{b.checkIn}</td>
                      <td className="py-3 text-gray-500">{b.nights}</td>
                      <td className="py-3 font-semibold text-navy-900">₹{b.totalPrice?.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          b.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── LISTINGS TAB ── */}
      {activeTab === "listings" && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-display font-bold text-navy-900 text-xl mb-5">Your Hotel Listings</h2>
            {listings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-3">No custom listings yet.</p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold px-5 py-2 rounded-xl text-sm transition"
                >
                  ➕ Add Your First Hotel
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((hotel) => (
                  <div key={hotel.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-navy-900">{hotel.name}</h3>
                      <p className="text-gray-500 text-sm">📍 {hotel.location} · {hotel.type}</p>
                      <p className="text-navy-900 font-semibold mt-1">₹{hotel.price?.toLocaleString()}/night</p>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this listing?")) deleteListing(hotel.id);
                        }}
                        className="mt-3 w-full text-red-500 border border-red-200 hover:bg-red-50 rounded-lg py-1.5 text-sm transition"
                      >
                        Delete Listing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ADD HOTEL TAB ── */}
      {activeTab === "add" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
          <h2 className="font-display font-bold text-navy-900 text-xl mb-6">Add a New Hotel</h2>

          {addSuccess && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
              ✅ Hotel added successfully! Check the Listings tab.
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Hotel Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. The Ocean Pearl" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Location *</label>
                <input name="location" value={form.location} onChange={handleChange}
                  placeholder="e.g. Goa" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Type</label>
                <select name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400">
                  {hotelTypes.filter((t) => t !== "All").map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Price per Night (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange}
                placeholder="e.g. 5000" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400" />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Image URL (optional)</label>
              <input name="image" value={form.image} onChange={handleChange}
                placeholder="https://... (leave blank for default)" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400" />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe the hotel..." rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400 resize-none" />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">
                Amenities (comma-separated)
              </label>
              <input name="amenities" value={form.amenities} onChange={handleChange}
                placeholder="Pool, WiFi, Restaurant, Gym" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400" />
            </div>

            <button
              onClick={handleAddListing}
              className="w-full bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 rounded-xl transition"
            >
              Add Hotel Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
