"use client"
import React, { useState } from 'react';
import CreateSubscriptionBoxForm from '@/components/adminpage/subscriptionbox/CreateSubscriptionBoxForm';// Adjust the import according to your directory structure
import { SubscriptionBoxCatalogAll } from '@/components/shop/SubscriptionBoxCatalogAll';
const SubscriptionBoxPage: React.FC = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const handleCreate = () => {
    setIsCreateFormOpen(false);
    // Add logic to refresh the subscription boxes list if needed
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-center text-5xl font-extrabold'>Our Snack Boxes</h1>
        <button
          className='border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          onClick={() => setIsCreateFormOpen(true)}
        >
          Create New Subscription Box
        </button>
      </div>
      {isCreateFormOpen && <CreateSubscriptionBoxForm onCreate={handleCreate} />}
    </div>
  );
};

export default SubscriptionBoxPage;
