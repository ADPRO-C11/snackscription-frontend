'use client';

import React, { useState, useEffect } from 'react';
import { SubscriptionCard } from './SubscriptionCard';
import SubscriptionService from './SubscriptionService';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { PiPackageFill } from 'react-icons/pi';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: string[];
  username: string;
  enabled: boolean;
}

interface Subscription {
  id: string;
  uniqueCode: string;
  type: string;
  shippingAddress: {
    address: string;
    city: string;
    phoneNumber: string;
    postalCode: string;
    province: string;
  };
  subscriptionBoxId: string;
  userId: string;
  status: string;
  dateCreated: string;
}

interface SubscriptionContainerProps {
  user: User;
}

export const SubscriptionContainer: React.FC<SubscriptionContainerProps> = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const token = getCookie('token');
        if (token && user.id) {
          const subscriptionList = await SubscriptionService.getSubscriptionByUser(user.id, token);
          setSubscriptions(await subscriptionList);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (user.id) {
      getSubscriptions();
    }
  }, [user.id]);

  const handleSave = async (updatedSubscription: Subscription) => {
    try {
      const token = getCookie('token');
      if (token) {
        await SubscriptionService.updateSubscription(updatedSubscription, token);
        setSubscriptions(subscriptions.map(sub => sub.id === updatedSubscription.id ? updatedSubscription : sub));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  return (
    <div className='py-16 px-64'>
      <div className='flex justify-between items-center py-5'>
        <h1 className='font-bold text-3xl text-bold flex items-center justify-center gap-3'>My Subscriptions <PiPackageFill /></h1>
        <Link href={"/subscription/create"}>
          <button className='bg-orange-300 p-3 rounded-lg'>Create Subscription</button>
        </Link>
      </div>
      
      <div className='flex flex-col gap-5'>
        {sortedSubscriptions.map((subscription, index) => (
          <SubscriptionCard key={index} subscription={subscription} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};
