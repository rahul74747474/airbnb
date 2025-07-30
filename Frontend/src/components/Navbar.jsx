import React from "react";

export default function Navmini() {
  return (
    <header className="w-screen h-24 flex justify-around items-center px-4 border-b border-[#ebeaea]">
      {/* Logo */}
      <div className="w-32 h-20 transform scale-125">
        <img src="/logo.png" alt="Airbnb Logo" className="h-full w-full object-contain" />
      </div>

      {/* Center Search Tabs */}
      <div className="w-[380px] h-10 flex items-center justify-center rounded-full border border-[#ebeaea] px-2 shadow-md">
        <div className="w-8 h-12 flex items-center">
          <img
            src="https://i.ibb.co/wZWMRWnj/home.png"
            alt="home"
            className="w-[30px] h-12 mt-1 object-contain rounded-l-[10px]"
          />
        </div>
        <div className="text-sm w-[108px] h-12 flex justify-center items-center">Anywhere</div>
        <div className="w-[1.5px] h-6 bg-[#e0e0e0] mx-1 rounded-sm" />
        <div className="text-sm w-[100px] h-12 flex justify-center items-center">Any week</div>
        <div className="w-[1.5px] h-6 bg-[#e0e0e0] mx-1 rounded-sm" />
        <div className="text-sm w-[108px] h-12 flex justify-center items-center">Add guests</div>
        <div className="w-[25px] h-[25px] bg-[#fe385d] p-[5px] rounded-full ml-2 flex justify-center items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Right Side Tabs */}
      <div className="w-[180px] h-10 flex items-center justify-evenly">
        <div className="text-sm">Browse</div>
        <div className="w-[30px] h-[30px] rounded-full">
          <svg
            viewBox="-9.6 -9.6 43.20 43.20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="-9.6"
              y="-9.6"
              width="43.20"
              height="43.20"
              rx="21.6"
              fill="#d4d4d4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 8.25H4.5V6.75H19.5V8.25Z"
              fill="#080341"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 12.75H4.5V11.25H19.5V12.75Z"
              fill="#080341"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 17.25H4.5V15.75H19.5V17.25Z"
              fill="#080341"
            />
          </svg>
        </div>
        <div className="w-[30px] h-[30px] rounded-full">
          <svg
            fill="#000000"
            viewBox="-10.8 -10.8 45.60 45.60"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="-10.8"
              y="-10.8"
              width="45.60"
              height="45.60"
              rx="22.8"
              fill="#ebeaea"
            />
            <path
              d="M21,12H3m13,0c0-5-1.79-9-4-9S8,7,8,12s1.79,9,4,9S16,17,16,12Z"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.44"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.44"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
