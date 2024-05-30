'use client';

import { Navbar } from '@/components/common/Navbar';
import { hasCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthenticationService from '@/components/authentication/AuthenticationService';

export default function UserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    authorities: [],
    username: '',
    enabled: true
  });

  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmNewPassword: '',
    role: ''
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!hasCookie('token')) {
        router.push('/welcome');
      } else {
        const token = getCookie('token');
        try {
          if (token) {
            const userData = await AuthenticationService.getProfile(token);
            setUser(userData.user);
            setEditUser({
              name: userData.user.name,
              email: userData.user.email,
              newPassword: '',
              confirmNewPassword: '',
              role: userData.user.role
            });
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [router]);

  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    if (editUser.newPassword !== editUser.confirmNewPassword) {
      alert("New password and confirm new password do not match");
      return;
    }
    try {
      const token = getCookie('token');
      if (token) {
        const updatedUser = await AuthenticationService.update(user.id, {
          name: editUser.name,
          email: editUser.email,
          password: editUser.newPassword,
          role: editUser.role
        }, token);
        setUser((prev) => ({
          ...prev,
          name: updatedUser.name,
          email: updatedUser.email
        }));
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this account?");
    if (confirmation) {
      try {
        const token = getCookie('token');
        if (token) {
          await AuthenticationService.delete(user.id, token);
          router.push('/welcome');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar username={user.name} />
      <div className="flex items-center justify-center min-h-screen bg-orange-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={editUser.newPassword}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={editUser.confirmNewPassword}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
