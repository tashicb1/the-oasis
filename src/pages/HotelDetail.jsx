// ============================================================
// HotelDetail.jsx — Full hotel page + booking form
// useParams() reads the :id from the URL like /hotel/1
// ============================================================

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { hotels as staticHotels } from "../data/hotels";
import { useBooking } from "../context/BookingContext";

export default function HotelDetail() {
  const { id } = useParams(); // reads the :id from URL → /hotel/1 gives id="1"
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { addBooking } = useBooking();

  // Find hotel by ID — check static data + admin listings
  const { listings } = useBooking();
  const allHotels = [...staticHotels, ...listings];
  const hotel = allHotels.find((h) => String(h.id) === String(id));

  // Booking form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [booked, setBooked] = useState(false);

  // If hotel not found
  if (!hotel) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-lg">Hotel not found.</p>
        <button onClick={() => navigate("/hotels")} className="mt-4 text-gold-500 underline">
          ← Back to Hotels
        </button>
      </div>
    );
  }

  // Calculate number of nights
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
        )
      : 0;

  const totalPrice = nights * hotel.price;

  // Handle booking submission
  const handleBook = () => {
    if (!checkIn || !checkOut || !selectedRoom) {
      alert("Please fill in all fields before booking.");
      return;
    }
    if (nights <= 0) {
      alert("Check-out must be after check-in.");
      return;
    }

    // Save booking through context (stored in localStorage)
    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      image: hotel.image,
      roomType: selectedRoom,
      checkIn,
      checkOut,
      guests,
      nights,
      pricePerNight: hotel.price,
      totalPrice,
      guestName: user?.fullName || "Guest",
      guestEmail: user?.primaryEmailAddress?.emailAddress || "",
    });

    setBooked(true); // show success message
  };

  // Success screen after booking
  if (booked) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4 fade-in">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-2">
          You've booked <strong>{selectedRoom}</strong> at <strong>{hotel.name}</strong>
        </p>
        <p className="text-gray-500 mb-6">
          {checkIn} → {checkOut} · {nights} night{nights !== 1 ? "s" : ""} · ₹{totalPrice.toLocaleString()}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/my-bookings")}
            className="bg-navy-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-800 transition"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/hotels")}
            className="border-2 border-navy-900 text-navy-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Browse More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 fade-in">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-navy-900 mb-6 flex items-center gap-2 transition">
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT: Hotel Info ── */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-80 object-cover rounded-2xl mb-6"
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="bg-navy-900 text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">
                {hotel.type}
              </span>
              <h1 className="font-display text-3xl font-bold text-navy-900">{hotel.name}</h1>
              <p className="text-gray-500 mt-1">📍 {hotel.location}</p>
            </div>
            <div className="text-right">
              <span className="text-gold-500 text-xl">★</span>
              <span className="font-bold text-navy-900 text-xl ml-1">{hotel.rating}</span>
              <p className="text-gray-400 text-sm">({hotel.reviews} reviews)</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">{hotel.description}</p>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-display font-bold text-navy-900 text-xl mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-gold-500">✓</span>
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div>
            <h3 className="font-display font-bold text-navy-900 text-xl mb-3">Room Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(hotel.rooms || ["Standard Room", "Deluxe Room"]).map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    selectedRoom === room
                      ? "border-gold-400 bg-gold-400/10"
                      : "border-gray-200 hover:border-gold-300"
                  }`}
                >
                  <span className="text-2xl">🛏️</span>
                  <p className="font-semibold text-navy-900 text-sm mt-1">{room}</p>
                  <p className="text-gray-400 text-xs">₹{hotel.price.toLocaleString()}/night</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Booking Form ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="font-display font-bold text-navy-900 text-xl mb-5">Reserve Your Stay</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-5">
              <span className="font-display text-3xl font-bold text-navy-900">₹{hotel.price.toLocaleString()}</span>
              <span className="text-gray-400">/ night</span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-5">
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]} // can't pick past dates
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wide block mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gold-400"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* Room type reminder */}
              {!selectedRoom && (
                <p className="text-amber-600 text-xs">← Please select a room type on the left</p>
              )}
              {selectedRoom && (
                <p className="text-green-600 text-xs">✓ Room: {selectedRoom}</p>
              )}
            </div>

            {/* Price breakdown */}
            {nights > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>₹{hotel.price.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Book / Sign-In Button */}
            {isSignedIn ? (
              <button
                onClick={handleBook}
                disabled={!hotel.available}
                className={`w-full py-3 rounded-xl font-bold text-sm transition ${
                  hotel.available
                    ? "bg-gold-400 hover:bg-gold-500 text-navy-900"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {hotel.available ? "Confirm Booking" : "Currently Unavailable"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full py-3 rounded-xl font-bold text-sm bg-gold-400 hover:bg-gold-500 text-navy-900 transition">
                  Sign In to Book
                </button>
              </SignInButton>
            )}

            <p className="text-gray-400 text-xs text-center mt-3">No credit card required to book</p>
          </div>
        </div>
      </div>
    </div>
  );
}
