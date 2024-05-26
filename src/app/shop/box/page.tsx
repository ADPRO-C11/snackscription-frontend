'use client'

import AuthenticationService from '@/components/authentication/AuthenticationService';
import { Navbar } from '@/components/common/Navbar';
import SubscriptionBoxDetail from '@/components/shop/SubscriptionBoxDetail';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
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
      <Navbar username={user.name} />
      <div className='h-screen m-32'>
        <SubscriptionBoxDetail name={name} />
      </div>
    </div>
  );
}
