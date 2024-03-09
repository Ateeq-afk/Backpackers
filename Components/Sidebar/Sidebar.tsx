import React from 'react';
import Link from 'next/link';
import { FaHeart, FaTag, FaUsers, FaCalendarAlt, FaCog, FaCamera, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { TbTrekking } from "react-icons/tb";
import { HiHomeModern } from "react-icons/hi2";
import { MdOutlineAttractions } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import Image from 'next/image';
const Sidebar = () => {
  return (
    <div className="flex flex-col w-[300px] px-4 py-8 bg-black text-white  sticky top-0 h-screen">
      <div className="flex flex-col items-center ">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className='w-[50px] h-[50px] relative'>
            <Image src="/logo.png" alt="Logo" objectFit='cover' layout='fill' />
            </div>
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
        <Link href="/createblogs">
          <div className="flex items-center space-x-3 text-yellow-400 ">
            <ImBlog  className="w-6 h-6" />
            <div>Create Blogs</div>
          </div>
        </Link>
        <Link href="/createattraction">
          <div className="flex items-center space-x-3 text-red-400 ">
            <MdOutlineAttractions  className="w-6 h-6" />
            <div>Create Attraction</div>
          </div>
        </Link>
        {/* Add other navigation links similarly */}
      </nav>
    </div>
  );
};
export default Sidebar;