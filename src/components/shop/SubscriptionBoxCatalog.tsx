import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import SubscriptionBoxService from '../subscription-box/SubscriptionBoxService';
import { SubscriptionBoxCard } from './SubscriptionBoxCard';

interface SubscriptionBox {
  id: string;
  name: string;
  type: string;
  price: number;
  items: Item[];
  description: string;
}

interface Item {
  id: string;
  name: string;
  quantity: number;
}

export const SubscriptionBoxCatalog = () => {

  const [subscriptionBoxes, setSubscriptionBoxes] = useState<SubscriptionBox[]>([]);

  useEffect(() => {
    const getSubscriptionBox = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const subscriptionBoxesList = await SubscriptionBoxService.getSubscriptionBox(token);
          setSubscriptionBoxes(subscriptionBoxesList);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    getSubscriptionBox();
  }, []);
  
  return (
    <>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-center text-5xl font-extrabold'>Our Snack Boxes</h1>
        <div className='flex gap-5 items-center justify-center'>
          <input className='border border-black rounded-lg px-3 py-2 w-[400px]' placeholder='Search'/>
          <button className='border border-black px-3 py-2 rounded-lg'>Search</button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {subscriptionBoxes.map((box) => (
          <SubscriptionBoxCard 
            key={box.id}
            id={box.id}
            name={box.name}
            type={box.type}
            price={box.price}
            items={box.items}
            description={box.description}
          />
        ))}
      </div>
    </>
  )
}
