import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import SubscriptionBoxService from '../subscription-box/SubscriptionBoxService';
import { SubscriptionBoxCard } from './SubscriptionBoxCard';
import { SubscriptionBoxEditModal } from '../adminpage/subscriptionbox/SubscriptionBoxEditModal';

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
  const [filteredBoxes, setFilteredBoxes] = useState<SubscriptionBox[]>([]);
  const [searchedName, setSearchedName] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [price, setPrice] = useState<number>(-1);
  const [selectedBox, setSelectedBox] = useState<SubscriptionBox | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const fetchSubscriptionBoxes = async () => {
    try {
      const token = getCookie('token');
      if (token) {
        const subscriptionBoxesList: SubscriptionBox[] = await SubscriptionBoxService.getSubscriptionBox(token);
        setSubscriptionBoxes(subscriptionBoxesList);
        setFilteredBoxes(subscriptionBoxesList); // Initialize filtered boxes with all boxes
      }
    } catch (error) {
      console.log("Error", error);
      setSubscriptionBoxes([]);
      setFilteredBoxes([]);
    }
  };

  const fetchSubscriptionBoxesByPrice = async (price: number, filter: string) => {
    try {
      const token = getCookie('token');
      if (token) {
        let subscriptionBoxesList: SubscriptionBox[] = [];
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
        setSubscriptionBoxes(subscriptionBoxesList);
        filterSubscriptionBoxes(searchedName, subscriptionBoxesList); // Apply search filter on fetched boxes
      }
    } catch (error) {
      console.log("Error", error);
      setSubscriptionBoxes([]);
      setFilteredBoxes([]);
    }
  };

  useEffect(() => {
    fetchSubscriptionBoxes();
  }, []);

  useEffect(() => {
    if (price === 0) {
      fetchSubscriptionBoxes();
    } else if (price > -1 && priceFilter) {
      fetchSubscriptionBoxesByPrice(price, priceFilter);
    } else {
      filterSubscriptionBoxes(searchedName, subscriptionBoxes); // Apply search filter on price change
    }
  }, [price, priceFilter]);

  const handleSearch = () => {
    const name = (document.getElementById('searched_name') as HTMLInputElement).value.toLowerCase();
    setSearchedName(name);
    filterSubscriptionBoxes(name, subscriptionBoxes);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    if (value === 0) {
      fetchSubscriptionBoxes();
      setPrice(-1); // Reset price to -1 to remove any active price filter
    } else {
      setPrice(value >= 0 ? value : -1);
    }
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value;
    setPriceFilter(filter);
    if (price > -1) {
      fetchSubscriptionBoxesByPrice(price, filter);
    }
  };

  const handleNavigation = () => {
    router.push('/shop');
  };

  const handleDelete = async (id: string) => {
    const token = getCookie('token');
    if (token) {
      const result = await SubscriptionBoxService.deleteSubscriptionBox(id, token);
      if (result) {
        setSubscriptionBoxes(subscriptionBoxes.filter(box => box.id !== id));
        setFilteredBoxes(filteredBoxes.filter(box => box.id !== id));
      }
    }
  };

  const handleUpdate = async (updatedBox: SubscriptionBox) => {
    const token = getCookie('token');
    if (token) {
      await SubscriptionBoxService.updateSubscriptionBox(updatedBox, token);
      setSubscriptionBoxes(subscriptionBoxes.map(box => (box.id === updatedBox.id ? updatedBox : box)));
      setFilteredBoxes(filteredBoxes.map(box => (box.id === updatedBox.id ? updatedBox : box)));
    }
  };

  const openEditModal = (box: SubscriptionBox) => {
    setSelectedBox(box);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBox(null);
  };

  const filterSubscriptionBoxes = (name: string, boxes: SubscriptionBox[]) => {
    const filtered = boxes.filter(box => box.name.toLowerCase().includes(name));
    setFilteredBoxes(filtered);
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
        {filteredBoxes && filteredBoxes.length > 0 ? (
          filteredBoxes.map((box) => (
            <SubscriptionBoxCard
              key={box.id}
              id={box.id}
              name={box.name}
              type={box.type}
              price={box.price}
              items={box.items}
              description={box.description}
              onDelete={handleDelete}
              onUpdate={() => openEditModal(box)}
            />
          ))
        ) : (
          <p>No subscription boxes found.</p>
        )}
      </div>
      {modalIsOpen && selectedBox && (
        <SubscriptionBoxEditModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          subscriptionBox={selectedBox}
          onSave={handleUpdate}
        />
      )}
    </>
  );
};
