'use client'

import React, { useState, useEffect } from 'react';
import { AdminSubscriptionCard } from './AdminSubscriptionCard';
import AdminSubscriptionService from './AdminSubscriptionService';
import Link from 'next/link';

export const AdminSubscriptionContainer = () => {
    const [adminSubscriptions, setAdminSubscriptions] = useState([]);

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const adminSubscriptionList = await AdminSubscriptionService.getSubscriptions();
                setAdminSubscriptions(await adminSubscriptionList.json());
            } catch (error) {
                console.log("Error", error);
            }
        };
        getSubscriptions();
    }, []);

    return (
        <div>
            <h1>Admin Subscription</h1>
            <Link href="/admin/list">
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Subscription</a>
            </Link>
            <div className="grid grid-cols-3 gap-4">
                {adminSubscriptions.map((subscription: any) => (
                    <AdminSubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
            </div>
        </div>
    );
};