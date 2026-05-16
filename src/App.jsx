// ============================================================
// App.jsx — The ROOT component. Sets up:
//   1. Clerk (authentication)
//   2. React Router (page navigation)
//   3. BookingContext (global state)
//   4. All page routes
// ============================================================

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { BookingProvider } from "./context/BookingContext";

// Pages
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Navbar from "./components/Navbar";

// ✅ This reads your key from the .env file
// You MUST set REACT_APP_CLERK_PUBLISHABLE_KEY in your .env file!
const CLERK_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {
  // Show error if Clerk key is missing
  if (!CLERK_KEY || CLERK_KEY.includes("REPLACE_WITH")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center bg-white rounded-2xl shadow p-8">
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">Clerk Key Missing</h2>
          <p className="text-gray-600 text-sm mb-4">
            Open the <code className="bg-gray-100 px-1 rounded">.env</code> file and replace{" "}
            <code className="bg-gray-100 px-1 rounded">REPLACE_WITH_YOUR_KEY_HERE</code> with your actual Clerk
            Publishable Key.
          </p>
          <p className="text-gray-400 text-xs">
            Find it at:{" "}
            <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-gold-500 underline">
              dashboard.clerk.com
            </a>{" "}
            → Your App → API Keys → Publishable Key
          </p>
        </div>
      </div>
    );
  }

  return (
    // ClerkProvider wraps everything — makes auth available everywhere
    <ClerkProvider publishableKey={CLERK_KEY}>
      {/* BookingProvider wraps everything — makes bookings/listings available everywhere */}
      <BookingProvider>
        {/* BrowserRouter enables URL-based navigation */}
        <BrowserRouter>
          {/* Navbar is shown on every page */}
          <Navbar />

          {/* Routes define which component to show for each URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />  {/* :id is dynamic */}
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* 404 page */}
            <Route
              path="*"
              element={
                <div className="text-center py-24">
                  <p className="text-6xl mb-4">404</p>
                  <p className="font-display text-2xl text-navy-900 font-bold">Page Not Found</p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </ClerkProvider>
  );
}
