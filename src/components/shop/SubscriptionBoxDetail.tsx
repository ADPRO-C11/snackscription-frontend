import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface SubscriptionBoxDetailProps {
  name: string;
}

export default function SubscriptionBoxDetail({ name }: SubscriptionBoxDetailProps) {
  const [subscriptionBoxes, setSubscriptionBoxes] = useState<SubscriptionBox[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptionBoxes = async () => {
      const token = getCookie('token');
      if (token) {
        const boxes = await SubscriptionBoxService.findByName(name, token);
        setSubscriptionBoxes(boxes);
      }
    };

    fetchSubscriptionBoxes();
  }, [name]);

  const handleNavigateToDistinctNames = () => {
    router.push('/shop');
  };

  const handleNavigateToCatalog = () => {
    router.push('/shop/catalog');
  };

  if (subscriptionBoxes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-center text-5xl font-extrabold'>Subscription Box Details</h1>
        <div className='flex gap-5'>
          <button className='border border-black px-3 py-2 rounded-lg' onClick={handleNavigateToDistinctNames}>
            Find Distinct Names
          </button>
          <button className='border border-black px-3 py-2 rounded-lg' onClick={handleNavigateToCatalog}>
            Go to Catalog
          </button>
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
    </div>
  );
}
