'use client'

import React, { useState, useEffect } from 'react';
import { SubscriptionCard } from './SubscriptionCard';
import SubscriptionService from './SubscriptionService';
import Link from 'next/link';

export const SubscriptionContainer = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const subscriptionList = await SubscriptionService.getSubscription();
                setSubscriptions(await subscriptionList.json());
            } catch (error) {
                console.log("Error", error);
            }
        };
        getSubscriptions();
    }, []);

    return (
        <div className='py-10 px-32'>
            <div className='flex justify-between items-center py-5'>
                <h1 className='font-bold text-3xl text-bold'>Your Subscriptions</h1>
                <Link href={"/subscription/create"}>
                    <button className='bg-orange-300 p-3 rounded-xl'>Create Subscription</button>
                </Link>
            </div>
            
            <div className='flex flex-col gap-5'>
                {subscriptions.map((subscription, index) => (
                    <SubscriptionCard key={index} subscription={subscription} />
                ))}
            </div>
        </div>
    );
};