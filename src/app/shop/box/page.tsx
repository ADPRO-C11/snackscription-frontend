'use client'

import AuthenticationService from '@/components/authentication/AuthenticationService';
import { Navbar } from '@/components/common/Navbar';
import { NavbarAdmin } from '@/components/common/NavbarAdmin';
import SubscriptionBoxDetail from '@/components/shop/SubscriptionBoxDetail';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';

const PageContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';

  return <SubscriptionBoxDetail name={name} />;
};

export default function Page() {
  const role = getCookie('role') as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
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
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {role === 'ADMIN' ? (
        <NavbarAdmin username={user.name} /> // Render NavbarAdmin for admin role
      ) : (
        <Navbar username={user.name} /> // Render Navbar for other roles
      )}
      <div className='h-screen m-32'>
        <Suspense fallback={<div>Loading...</div>}>
          <PageContent />
        </Suspense>
      </div>
    </div>
  );
}
