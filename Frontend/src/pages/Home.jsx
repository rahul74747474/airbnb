import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // axios instance
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get("/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative px-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Explore Stays</h1>
      
      <div className="flex flex-wrap gap-4">
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>

      {/* ✅ Quick Action Button */}
      <Link
        to="/create-listing"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#ff385c] text-white flex items-center justify-center rounded-full shadow-lg hover:bg-[#e73550] transition"
      >
        {/* SVG Plus Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus"
          viewBox="0 0 24 24"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
