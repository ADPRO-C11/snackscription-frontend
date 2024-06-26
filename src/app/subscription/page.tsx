'use client';

import { Navbar } from '@/components/common/Navbar';
import { SubscriptionContainer } from '@/components/subscription/SubscriptionContainer';
import { hasCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthenticationService from '@/components/authentication/AuthenticationService';

export default function SubscriptionPage() {
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
    <>
      <Navbar username={user.name}/>
      <div className='mt-16 h-full bg-orange-100'>
        <SubscriptionContainer user={user} />
      </div>
    </>
  );
}
