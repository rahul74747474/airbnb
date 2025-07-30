import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Reviews from "../components/Reviews";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));

       api.get("/users/me")
    .then((res) => setCurrentUser(res.data))
    .catch((err) => console.error("Not logged in"));
  }, [id]);

  const currentUserId = localStorage.getItem("userId"); // ✅ Update if you use context instead

  const handleToggleReserve = async () => {
    try {
      const res = await api.put(`/listings/${listing._id}/toggle-reserve`);
      setListing(res.data);
    } catch (err) {
      console.error("Reservation error:", err.response?.data || err.message);
    }
  };

  if (!listing) return <div className="text-center mt-10">Loading...</div>;

  const isBooked = listing.isBooked;
  const hostName = listing.user?.name || "Host";
  const isBookedBySomeoneElse =
  listing.isBooked && listing.bookedBy !== currentUser?._id;
  const isBookedByCurrentUser =
  listing.isBooked && listing.bookedBy === currentUser?._id;


  return (
    <>
      {/* Header */}
      <div className="flex justify-center items-center main-head">
        <div className="headline w-[80vw] h-20 flex justify-between items-center text-[26px]">
          <div className="font-semibold">
            <h4>{listing.title}</h4>
          </div>
          <div className="flex gap-2">
            <button type="button">Share</button>
            <button type="button">Save</button>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="images w-[80vw] h-[340px] bg-gray-300 mx-auto rounded-xl overflow-hidden">
        <img
          src={listing.image?.url || "https://via.placeholder.com/800x340?text=No+Image"}
          alt="Listing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="content w-[80vw] mx-auto flex justify-center items-center gap-10 mt-6 mb-10 border-b-2 border-[#ebeaea] pb-10">
        {/* Left Content */}
        <div className="left-content w-[52vw] h-auto">
          {/* Description */}
          <div className="name text-[22px] mt-6 font-medium">
            <h4>Description</h4>
            <p className="subname text-[16px] mt-1 text-gray-600">{listing.description}</p>
          </div>

          {/* Host Info */}
          <div className="hostname w-[90%] h-[85px] mt-6 border-b border-[#ebeaea] px-3 flex items-center gap-5">
            <div className="hostimg w-10 h-10 rounded-full bg-red-500" />
            <div>
              <p className="hostame text-[16px] font-semibold">Hosted by {hostName}</p>
              <p className="hostexp text-[14px] text-gray-500 mt-0.5">Superhost • 7 months hosting</p>
            </div>
          </div>

          {/* About Section */}
          <div className="about w-[90%] h-[250px] mt-4 px-3 flex flex-col gap-6 ">
            <h4 className="name font-medium text-[22px]">What this place offers</h4>

            {/* Amenities */}
            <div className="about-info flex items-center gap-3 text-[18px]">
              <div className="subname-img w-[30px] h-[30px] flex justify-center items-center">
                {/* Kitchen Icon */}
                <svg fill="#000000" width="24px" height="24px" viewBox="0 0 512 512">
                  <g>
                    <path d="..." /> {/* Keep as-is */}
                  </g>
                </svg>
              </div>
              Kitchen
            </div>

            <div className="about-info flex items-center gap-3 text-[18px]">
              <div className="subname-img w-[30px] h-[30px] flex justify-center items-center">
                {/* Workspace Icon */}
                <svg width="35" height="35" viewBox="0 0 45 45" fill="none">
                  <path d="..." /> {/* Keep as-is */}
                </svg>
              </div>
              Dedicated Workspace
            </div>

            <div className="about-info flex items-center gap-3 text-[18px]">
              <div className="subname-img w-[30px] h-[30px] flex justify-center items-center">
                {/* Lift Icon */}
                <svg width="24" height="24" viewBox="0 0 64 64" fill="#000000">
                  <g>
                    <path d="..." /> {/* Keep as-is */}
                  </g>
                </svg>
              </div>
              Lift
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="right-content w-[28vw] flex justify-center items-start">
          <div className="reserve w-[80%] h-[290px] mt-[100px] rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
            <div className="head w-[90%] h-[50px] flex items-center mb-4">
              <span className="price text-[22px] mr-2 font-semibold">₹{listing.price}</span>
              <span className="subname text-[16px] text-gray-600">per night</span>
            </div>

            <div className="w-[90%] h-[100px] border border-gray-300 rounded-xl">
              {/* Check-in & Checkout */}
              <div className="flex h-1/2">
                <div className="w-1/2 border-r border-gray-300 px-3 py-2">
                  <p className="text-[12px] font-semibold uppercase tracking-wide">Check-in</p>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="text-[15px] text-black w-full focus:outline-none"
                  />
                </div>
                <div className="w-1/2 px-3 py-2">
                  <p className="text-[12px] font-semibold uppercase tracking-wide">Checkout</p>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="text-[15px] text-black w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div
                className="relative flex items-center justify-between h-1/2 px-3 border-t border-gray-300 cursor-pointer"
                onClick={() => setGuestDropdownOpen((prev) => !prev)}
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide">Guests</p>
                  <p className="text-[15px] text-black">{guests} guest{guests > 1 ? "s" : ""}</p>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>

                {guestDropdownOpen && (
                  <div className="absolute z-10 top-full mt-1 left-0 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setGuests(i + 1);
                          setGuestDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

           {/* Reserve Button */}
          <div
            onClick={
              isBookedBySomeoneElse ? null : handleToggleReserve
            }
            className={`reserve-btn w-[90%] h-[50px] text-white text-[18px] rounded-full mt-5 flex items-center justify-center ${
              isBookedBySomeoneElse
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ff385c] cursor-pointer"
            }`}
          >
            {isBookedBySomeoneElse
              ? "Not Available"
              : isBookedByCurrentUser
              ? "Unreserve"
              : "Reserve"}
          </div>

          <div className="condition w-[90%] text-[13px] text-center text-gray-500 mt-2">
            {isBookedBySomeoneElse
              ? "This listing is already booked"
              : isBookedByCurrentUser
              ? "You have reserved this listing"
              : "You won't be charged yet"}
          </div>
          </div>
        </div>
      </div>

      <Reviews listingId={id} />
    </>
  );
}
