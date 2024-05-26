import React, { useState } from 'react';

export const SubscriptionCard = ({ subscription }: any) => {
  const [isClicked, setIsClicked] = useState(false);

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
    }, 200);
  };

  return (
    <div
      onClick={handleClick}
      className={`subscription-card border border-gray-300 p-10 rounded-lg shadow-lg transition duration-300 ease-in-out ${
        isClicked ? 'bg-[#f7e3c0]' : 'bg-[#FAF3E0]'
      }`}
    >
      <div className='font-bold'>{subscription.uniqueCode}</div>
      <div>Subscription Type : {subscription.type}</div>
      <div>Status : {subscription.status}</div>
      <div>Issued at : {formattedDate}</div>
    </div>
  );
};
