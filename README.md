# 🏨 LuxeStay — Hotel Booking Web App

Built with **React.js**, **Tailwind CSS**, and **Clerk** authentication.

---

## 📖 What This Project Does

| Feature | What it means |
|---|---|
| **Browse Hotels** | See all hotels with photos, prices, ratings |
| **Search & Filter** | Filter by location, type, price — like Booking.com |
| **Hotel Detail Page** | Full info + booking form for each hotel |
| **Sign In / Sign Up** | Clerk handles this — no backend needed |
| **My Bookings** | See all your reservations, cancel them |
| **Admin Dashboard** | Add new hotel listings, manage all bookings |

---

## 🗂 Project Folder Structure (Explained)

```
hotel-booking/
├── public/
│   └── index.html          ← The single HTML file React fills in
├── src/
│   ├── data/
│   │   └── hotels.js       ← All hotel data (like a fake database)
│   ├── context/
│   │   └── BookingContext.jsx  ← Global state (shared data between pages)
│   ├── components/
│   │   ├── Navbar.jsx      ← Top navigation bar (shown on every page)
│   │   └── HotelCard.jsx   ← One hotel card (used in lists)
│   ├── pages/
│   │   ├── Home.jsx        ← Landing page with hero + search
│   │   ├── Hotels.jsx      ← All hotels + filters
│   │   ├── HotelDetail.jsx ← Single hotel + booking form
│   │   ├── MyBookings.jsx  ← User's booking history
│   │   └── AdminDashboard.jsx ← Manage listings + view all bookings
│   ├── App.jsx             ← Root: sets up Clerk, Router, all pages
│   ├── index.js            ← Entry point (React starts here)
│   └── index.css           ← Global styles + Tailwind
├── .env                    ← YOUR SECRET KEYS (never upload to GitHub)
├── tailwind.config.js      ← Tailwind color/font config
└── package.json            ← Dependencies list
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Install Node.js
If you don't have it: https://nodejs.org → Download LTS version

Check it works:
```bash
node --version
# Should show v18.x.x or higher
```

### Step 2 — Open the project in VS Code
1. Open VS Code
2. File → Open Folder → select the `hotel-booking` folder

### Step 3 — Install dependencies
Open the **VS Code Terminal** (View → Terminal) and run:
```bash
npm install
```
This downloads React, Clerk, Tailwind, etc. into the `node_modules` folder. Wait for it to finish (1-2 minutes).

### Step 4 — Add your Clerk Key
1. Go to https://dashboard.clerk.com
2. Click your app (or create a new one — choose "React" as framework)
3. Go to **API Keys** in the left menu
4. Copy the **Publishable Key** (starts with `pk_test_...`)
5. Open the `.env` file in VS Code
6. Replace `pk_test_REPLACE_WITH_YOUR_KEY_HERE` with your actual key

```
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

> ⚠️ The `.env` file is in `.gitignore` so it won't be uploaded to GitHub. Good!

### Step 5 — Configure Clerk (Important!)
In your Clerk Dashboard:
- Go to **User & Authentication → Email, Phone, Username**
- Make sure **Email address** is enabled for sign-in
- Go to **Paths** → set Allowed redirect URLs to `http://localhost:3000`

### Step 6 — Run the app
```bash
npm start
```
Your browser will open at **http://localhost:3000** 🎉

---

## 🔑 Key Concepts Explained (For Beginners)

### What is React?
React is a JavaScript library for building UIs. Instead of writing HTML directly, you write **components** — reusable pieces of UI like `<HotelCard />`. Think of it like PHP `include()` but much more powerful.

### What is JSX?
JSX looks like HTML but it's actually JavaScript. You can mix HTML and JS:
```jsx
// This is JSX — HTML inside JavaScript
const name = "Goa";
return <h1>Hotels in {name}</h1>;  // Curly braces = JavaScript
```

### What is a Component?
A function that returns JSX. Like a building block:
```jsx
function HotelCard({ hotel }) {
  return <div>{hotel.name}</div>;
}
```

### What is State (useState)?
Variables that make the page re-render when they change:
```jsx
const [count, setCount] = useState(0);  // count starts at 0
setCount(5);  // page updates automatically!
```
In PHP, you'd need to reload the page. React updates instantly.

### What is React Router?
Changes the URL and shows different components without page reload:
- `/` → Home page
- `/hotels` → Hotels list
- `/hotel/1` → Hotel #1 detail page

### What is Context (useContext)?
A way to share data between components without passing it down manually:
```jsx
// Any component can read bookings:
const { bookings, addBooking } = useBooking();
```

### What is Clerk?
Clerk handles all authentication (sign in, sign up, sessions). Without Clerk, you'd need to build your own backend + database for user accounts. Clerk gives you:
- A beautiful sign-in UI popup
- `useUser()` hook to check if user is logged in
- `<UserButton />` — the avatar+dropdown in the navbar

### What is Tailwind CSS?
Utility-first CSS — instead of writing:
```css
.button { background: blue; padding: 8px 16px; border-radius: 8px; }
```
You write classes directly in JSX:
```jsx
<button className="bg-blue-500 px-4 py-2 rounded-lg">Click</button>
```

### What is localStorage?
Browser storage that saves data even after page refresh. We use it to persist bookings without a real database. In a real app, this would be a backend API + database.

---

## 📤 Uploading to GitHub

```bash
# One-time setup (inside the hotel-booking folder)
git init
git add .
git commit -m "Initial commit"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/hotel-booking.git
git push -u origin main
```

> ✅ `.env` is in `.gitignore` so your Clerk key stays private.

---

## 🛠 Common Errors & Fixes

| Error | Fix |
|---|---|
| `npm: command not found` | Install Node.js from nodejs.org |
| Blank page with key error | Add your Clerk key to `.env` file |
| `Cannot find module` | Run `npm install` again |
| Clerk sign-in not working | Add `http://localhost:3000` to Clerk allowed URLs |
| Styles not loading | Make sure you ran `npm install` (installs Tailwind) |

---

## 🔮 How to Extend This Project

- **Real database**: Use Firebase or Supabase instead of localStorage
- **Payment**: Integrate Razorpay or Stripe
- **Real hotels API**: Connect to a hotel API (like Amadeus or MakeMyTrip)
- **Admin restriction**: Use Clerk's roles/metadata to allow only certain emails as admin
- **Email confirmation**: Use Clerk webhooks + EmailJS to send booking confirmation emails

---

Built with ❤️ using React, Tailwind CSS, and Clerk.
