import React, { useState } from 'react';
import SubscriptionModal from './SubscriptionModal';

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

interface SubscriptionCardProps {
  subscription: Subscription;
  onSave: (updatedSubscription: Subscription) => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onSave }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = new Date(subscription.dateCreated);
  date.setHours(date.getHours() + 7);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'Asia/Jakarta',
  };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsModalOpen(true);
    }, 200);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`subscription-card border border-gray-300 p-10 rounded-lg shadow-lg transition duration-300 ease-in-out ${
          isClicked ? 'bg-[#f7e3c0]' : 'bg-[#FAF3E0]'
        }`}
      >
        <div className='font-bold'>{subscription.uniqueCode}</div>
        <div>Subscription Type : {subscription.type}</div>
        <div>Address : {subscription.shippingAddress.address}, {subscription.shippingAddress.city}</div>
        <div>Status : {subscription.status}</div>
        <div>Issued at : {formattedDate}</div>
      </div>
      {isModalOpen && (
        <SubscriptionModal subscription={subscription} onClose={handleCloseModal} onSave={onSave} />
      )}
    </>
  );
};
