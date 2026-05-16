// ============================================================
// BookingContext.js — This is our "global state"
// Think of it like a shared variable that ALL components can read/write.
// This is how React shares data without passing it through every component.
// In a real app, bookings would be saved to a database.
// ============================================================

import React, { createContext, useContext, useState } from "react";

// Step 1: Create the context (like creating an empty shared box)
const BookingContext = createContext();

// Step 2: Create the Provider (the component that wraps our app and fills the box)
export function BookingProvider({ children }) {
  // bookings = list of all bookings made by the user
  // We use localStorage so bookings survive page refresh
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("hotel_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // listings = hotels added by the partner/admin
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem("hotel_listings");
    return saved ? JSON.parse(saved) : [];
  });

  // Add a new booking
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(), // unique ID using current timestamp
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString(),
    };
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem("hotel_bookings", JSON.stringify(updated)); // save to browser
  };

  // Cancel a booking
  const cancelBooking = (bookingId) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
    localStorage.setItem("hotel_bookings", JSON.stringify(updated));
  };

  // Add a new hotel listing (for partners/admin)
  const addListing = (listing) => {
    const newListing = {
      ...listing,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      available: true,
    };
    const updated = [...listings, newListing];
    setListings(updated);
    localStorage.setItem("hotel_listings", JSON.stringify(updated));
  };

  // Delete a listing
  const deleteListing = (listingId) => {
    const updated = listings.filter((l) => l.id !== listingId);
    setListings(updated);
    localStorage.setItem("hotel_listings", JSON.stringify(updated));
  };

  // Share everything through context
  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, listings, addListing, deleteListing }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// Step 3: Custom hook — lets any component access context easily
// Usage in any component: const { bookings, addBooking } = useBooking();
export function useBooking() {
  return useContext(BookingContext);
}
