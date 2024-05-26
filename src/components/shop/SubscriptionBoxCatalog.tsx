import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

import { useRouter }   from 'next/navigation';
import SubscriptionBoxService from '../subscription-box/SubscriptionBoxService';
import { SubscriptionBoxNameCard } from './SubscriptionBoxNameCard';


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


export const SubscriptionBoxCatalog: React.FC = () => {
  const [distinctNames, setDistinctNames] = useState<string[]>([]);
  const [searchedName, setSearchedName] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [price, setPrice] = useState<number>(-1);
  const router = useRouter();

  const getDistinctNames = async () => {
    try {
      const token = getCookie('token');
      if (token) {
        const namesList = await SubscriptionBoxService.findDistinctNames(token);
        setDistinctNames(namesList);
      }
    } catch (error) {
      console.log("Error", error);
      setDistinctNames([]);
    }
  };

  useEffect(() => {
    getDistinctNames();
  }, []);

  const handleSearch = () => {
    const name = (document.getElementById('searched_name') as HTMLInputElement).value;
    setSearchedName(name);
    getDistinctNames(); // Fetch distinct names on search
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setPrice(value > 0 ? value : -1);
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(event.target.value);
  };

  const handleNavigation = () => {
    router.push('/shop/catalog');
  };


  return (
    <>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-center text-5xl font-extrabold'>Our Snack Boxes</h1>
        <div className='flex gap-5 items-center justify-center'>

          <input
            className='border border-black rounded-lg px-3 py-2 w-[400px]'
            name='searched_name'
            id='searched_name'
            placeholder='Search'
          />
          <button className='border border-black px-3 py-2 rounded-lg' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className='flex justify-between items-center mb-10'>
        <button className='border border-black px-3 py-2 rounded-lg' onClick={handleNavigation}>
          Go to Subscription Boxes Catalog
        </button>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {distinctNames && distinctNames.length > 0 ? (
          distinctNames.map((name, index) => (
            <SubscriptionBoxNameCard
              key={index}
              name={name}     
            />
          ))
        ) : (
          <p>No subscription boxes found.</p>
        )}
      </div>
    </>
  );
};

