'use client'

import React, { useState, useEffect, useRef } from 'react';
import AuthenticationService from '../authentication/AuthenticationService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VscAccount } from 'react-icons/vsc';

export const Navbar = ({ username }: any) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    AuthenticationService.logout();
    toast.success('Logout Success');
    router.push('/welcome');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='fixed top-0 left-0 flex w-full p-4 px-10 justify-between items-center shadow-lg z-50' style={{ backgroundColor: "#FF7C36" }}>
      <h1 className='font-bold text-xl text-white'><Link href={"/"}>Snackscription</Link></h1>
      <div className='flex justify-between items-center gap-10 ml-24'>
        <Link href={'/'} className="text-white font-light py-3 rounded-md text-sm sm:text-lg hover:text-orange-200">Home</Link>
        <Link href={'/shop'} className="text-white font-light py-3 rounded-md text-sm sm:text-lg hover:text-orange-200">Shop</Link>
        <Link href={'/subscription'} className="text-white font-light py-3 rounded-md text-sm sm:text-lg hover:text-orange-200">My Subscriptions</Link>
      </div>
      <div className='relative flex items-center justify-center gap-6'>
        <div
          className='text-white text-lg font-extralight cursor-pointer hover:text-orange-200'
          onClick={toggleDropdown}
        >
          <div className='flex gap-2 items-center justify-center'>
            <VscAccount size={24} /> 
            <span>{username}</span>
          </div>
        </div>
        {isDropdownOpen && (
          <div ref={dropdownRef} className='absolute right-0 mt-12 w-48 bg-white shadow-lg rounded-md'>
            <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit Profile</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
