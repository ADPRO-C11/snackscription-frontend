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
  const [sortType, setSortType] = useState<string>('date');
  const [filterType, setFilterType] = useState<string>('all');

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

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filterType === 'all') return true;
    return sub.type.toLowerCase() === filterType;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortType === 'date') {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    } else if (sortType === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  return (
    <div className='py-16 px-64'>
      <div className='flex justify-between items-center py-5'>
        <h1 className='font-bold text-3xl text-bold flex items-center justify-center gap-3'>My Subscriptions <PiPackageFill /></h1>
        <div className='flex items-center gap-4'>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg bg-orange-50'
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg bg-orange-50'
          >
            <option value="all">All</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="semi-annual">Semi-Annual</option>
          </select>
        </div>
      </div>
      
      <div className='flex flex-col gap-5 h-screen'>
        {subscriptions.length > 0 ? (
          sortedSubscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} subscription={subscription} onSave={handleSave} />
          ))
        ) : (
          <div className='h-screen p-44'>
            <p className='text-center text-xl'>You have no subscriptions yet. <Link href="/shop" className='font-medium hover:font-bold'>Shop Here</Link></p>
          </div>
        )}
      </div>
    </div>
  );
};
