import React from 'react';
import Link from 'next/link';
import { FaHeart, FaTag, FaUsers, FaCalendarAlt, FaCog, FaCamera, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { TbTrekking } from "react-icons/tb";
import { HiHomeModern } from "react-icons/hi2";
const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-black text-white  sticky top-0 h-screen">
      <div className="flex flex-col items-center ">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">Backpackers United</span>
          </div>
        </Link>
      </div>
      <nav className="flex flex-col gap-5 mt-10">
        {/* Your navigation links */}
        <Link href="/createactivity">
          <div className="flex items-center space-x-3 text-pink-400 ">
            <TbTrekking className="w-6 h-6" />
            <span>Create Activity</span>
          </div>
        </Link>
        <Link href="/createstays">
          <div className="flex items-center space-x-3 text-blue-400 ">
            <HiHomeModern className="w-6 h-6" />
            <span>Create Stays/Camping</span>
          </div>
        </Link>
        {/* Add other navigation links similarly */}
      </nav>
    </div>
  );
};
export default Sidebar;