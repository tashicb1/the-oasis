// ============================================================
// MyBookings.jsx — Shows the logged-in user's booking history
// Protected: if not signed in, Clerk redirects to login
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useBooking } from "../context/BookingContext";

export default function MyBookings() {
  const { isSignedIn, user } = useUser();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();

  // If not signed in, show message
  if (!isSignedIn) {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">Sign In Required</h2>
        <p className="text-gray-500">Please sign in to view your bookings.</p>
      </div>
    );
  }

  // Get status badge color
  const statusColor = (status) => {
    if (status === "Confirmed") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900 mb-1">My Bookings</h1>
        <p className="text-gray-500">Welcome back, {user?.firstName}! Here are your reservations.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="font-display text-2xl font-bold text-navy-900">{bookings.length}</p>
          <p className="text-gray-500 text-sm">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="font-display text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "Confirmed").length}
          </p>
          <p className="text-gray-500 text-sm">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="font-display text-2xl font-bold text-red-500">
            {bookings.filter((b) => b.status === "Cancelled").length}
          </p>
          <p className="text-gray-500 text-sm">Cancelled</p>
        </div>
      </div>

      {/* No bookings state */}
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <div className="text-5xl mb-4">🗓️</div>
          <p className="font-display text-xl font-bold text-navy-900 mb-2">No bookings yet</p>
          <p className="text-gray-400 mb-6">Start exploring hotels and make your first reservation!</p>
          <button
            onClick={() => navigate("/hotels")}
            className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded-xl transition"
          >
            Browse Hotels
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Show newest booking first */}
          {[...bookings].reverse().map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hotel-card">
              <div className="flex flex-col sm:flex-row">
                {/* Hotel Image */}
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="w-full sm:w-44 h-40 sm:h-auto object-cover"
                />

                {/* Booking Details */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-bold text-navy-900 text-lg">{booking.hotelName}</h3>
                      <p className="text-gray-500 text-sm">📍 {booking.location}</p>
                    </div>
                    {/* Status Badge */}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold">Room</p>
                      <p className="text-navy-900 font-medium">{booking.roomType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold">Check-In</p>
                      <p className="text-navy-900 font-medium">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold">Check-Out</p>
                      <p className="text-navy-900 font-medium">{booking.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold">Guests</p>
                      <p className="text-navy-900 font-medium">{booking.guests}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="font-bold text-navy-900 text-lg">₹{booking.totalPrice?.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm"> · {booking.nights} night{booking.nights !== 1 ? "s" : ""}</span>
                    </div>

                    {/* Cancel button (only for confirmed bookings) */}
                    {booking.status === "Confirmed" && (
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this booking?")) {
                            cancelBooking(booking.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-medium border border-red-200 hover:border-red-400 px-4 py-2 rounded-xl transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
