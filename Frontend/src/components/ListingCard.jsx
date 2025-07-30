import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="w-60 rounded-xl overflow-hidden relative bg-white shadow-md transition text-black hover:shadow-lg block"
    >
      <img
        src={listing.image?.url}
        alt="listing"
        className="w-full h-40 object-cover"
      />
      {listing.favourite && (
        <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded-md font-bold">
          Guest favourite
        </div>
      )}
      <div className="p-3">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-700">
          ₹{listing.price} for {listing.nights} nights · ★ {listing.rating}
        </p>
      </div>
    </Link>
  );
}

