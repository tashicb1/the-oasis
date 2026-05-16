// ============================================================
// Navbar.jsx — Top navigation bar
// Uses Clerk's UserButton to show login/logout automatically.
// React Router's <Link> is used instead of <a> to navigate without page reload.
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser(); // Clerk hook - tells us if user is logged in
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu toggle

  return (
    <nav className="bg-navy-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-gold-400 text-2xl">🏨</span>
          <span className="font-display text-white text-xl font-bold">
            The<span className="text-gold-400">Oasis</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-gold-400 transition font-body text-sm font-medium">
            Home
          </Link>
          <Link to="/hotels" className="text-gray-300 hover:text-gold-400 transition font-body text-sm font-medium">
            Hotels
          </Link>

          {/* Show these links only when logged in */}
          {isSignedIn && (
            <>
              <Link to="/my-bookings" className="text-gray-300 hover:text-gold-400 transition font-body text-sm font-medium">
                My Bookings
              </Link>
              <Link to="/admin" className="text-gray-300 hover:text-gold-400 transition font-body text-sm font-medium">
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm hidden md:block">
                Hi, {user.firstName || "Guest"} 👋
              </span>
              {/* Clerk's built-in user menu (avatar + dropdown) */}
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            /* Clerk's built-in sign-in button */
            <SignInButton mode="modal">
              <button className="bg-gold-400 hover:bg-gold-500 text-navy-900 font-semibold px-4 py-2 rounded-lg text-sm transition">
                Sign In
              </button>
            </SignInButton>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white text-xl ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-800 px-4 pb-4 flex flex-col gap-3">
          <Link to="/" className="text-gray-300 hover:text-gold-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/hotels" className="text-gray-300 hover:text-gold-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Hotels</Link>
          {isSignedIn && (
            <>
              <Link to="/my-bookings" className="text-gray-300 hover:text-gold-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>My Bookings</Link>
              <Link to="/admin" className="text-gray-300 hover:text-gold-400 py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
