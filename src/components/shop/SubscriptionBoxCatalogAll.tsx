import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import SubscriptionBoxService from '../subscription-box/SubscriptionBoxService';
import { SubscriptionBoxCard } from './SubscriptionBoxCard';
import SubscriptionModal from './SubscriptionModal';

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

export const SubscriptionBoxCatalogAll: React.FC = () => {
  const [subscriptionBoxes, setSubscriptionBoxes] = useState<SubscriptionBox[]>([]);
  const [searchedName, setSearchedName] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [price, setPrice] = useState<number>(-1);
  const [selectedBox, setSelectedBox] = useState<SubscriptionBox | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const getSubscriptionBox = async (name?: string, price?: number, filter?: string) => {
    try {
      const token = getCookie('token');
      if (token) {
        let subscriptionBoxesList: SubscriptionBox[] = [];
        if (name) {
          subscriptionBoxesList = await SubscriptionBoxService.findByName(name, token);
        } else if (price !== undefined && price > -1 && filter) {
          switch (filter) {
            case 'less-than':
              subscriptionBoxesList = await SubscriptionBoxService.findByPriceLessThan(price, token);
              break;
            case 'greater-than':
              subscriptionBoxesList = await SubscriptionBoxService.findByPriceGreaterThan(price, token);
              break;
            case 'equals':
              subscriptionBoxesList = await SubscriptionBoxService.findByPriceEquals(price, token);
              break;
            default:
              break;
          }
        } else {
          subscriptionBoxesList = await SubscriptionBoxService.getSubscriptionBox(token);
        }
        setSubscriptionBoxes(subscriptionBoxesList);
      }
    } catch (error) {
      console.log("Error", error);
      setSubscriptionBoxes([]);
    }
  };

  useEffect(() => {
    getSubscriptionBox();
  }, []);

  useEffect(() => {
    if (price > -1 && priceFilter) {
      getSubscriptionBox(searchedName, price, priceFilter);
    }
  }, [price, priceFilter, searchedName]);

  const handleSearch = () => {
    const name = (document.getElementById('searched_name') as HTMLInputElement).value;
    setSearchedName(name);
    getSubscriptionBox(name, price, priceFilter);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    setPrice(value > 0 ? value : -1);
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(event.target.value);
  };

  const handleNavigation = () => {
    router.push('/shop');
  };

  const handleCardClick = (box: SubscriptionBox) => {
    setSelectedBox(box);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBox(null);
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
          Filter by distinct names
        </button>
        <div className='flex gap-5 items-center'>
          <label className='flex items-center'>
            <span className='mr-2'>Price</span>
            <input
              type='number'
              className='border border-black rounded-lg px-3 py-2 w-[150px]'
              placeholder='Enter price'
              id='price'
              min='0'
              onChange={handlePriceChange}
            />
            <select
              className='border border-black rounded-lg px-3 py-2 ml-2'
              id='priceFilter'
              defaultValue='select price filter'
              onChange={handlePriceFilterChange}
            >
              <option value='select price filter' disabled>
                Select price filter
              </option>
              <option value='less-than'>Less than</option>
              <option value='greater-than'>Greater than</option>
              <option value='equals'>Equals</option>
            </select>
          </label>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {subscriptionBoxes && subscriptionBoxes.length > 0 ? (
          subscriptionBoxes.map((box) => (
            <div key={box.id} onClick={() => handleCardClick(box)}>
              <SubscriptionBoxCard
                id={box.id}
                name={box.name}
                type={box.type}
                price={box.price}
                items={box.items}
                description={box.description}
              />
            </div>
          ))
        ) : (
          <p>No subscription boxes found.</p>
        )}
      </div>
      {selectedBox && (
        <SubscriptionModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          subscriptionBox={selectedBox}
        />
      )}
    </>
  );
};