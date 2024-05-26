import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
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
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentBox, setCurrentBox] = useState<SubscriptionBox | null>(null);
  const router = useRouter();

  const fetchSubscriptionBoxes = async () => {
    try {
      const token = getCookie('token');
      if (token) {
        const subscriptionBoxesList: SubscriptionBox[] = await SubscriptionBoxService.getSubscriptionBox(token);
        setSubscriptionBoxes(subscriptionBoxesList);
      }
    } catch (error) {
      console.log("Error", error);
      setSubscriptionBoxes([]);
    }
  };

  useEffect(() => {
    fetchSubscriptionBoxes();
  }, []);

  const handleDelete = async (id: string) => {
    const token = getCookie('token');
    if (token) {
      const result = await SubscriptionBoxService.deleteSubscriptionBox(id, token);
      if (result) {
        setSubscriptionBoxes(subscriptionBoxes.filter(box => box.id !== id));
      }
    }
  };

  const handleUpdate = async (updatedBox: SubscriptionBox) => {
    const token = getCookie('token');
    if (token) {
      await SubscriptionBoxService.updateSubscriptionBox(updatedBox, token);
      setSubscriptionBoxes(subscriptionBoxes.map(box => (box.id === updatedBox.id ? updatedBox : box)));
    }
  };

  const openEditModal = (box: SubscriptionBox) => {
    setCurrentBox(box);
    setEditModalOpen(true);
  };

  const handleNavigation = () => {
    router.push('/shop');
  };

  if (subscriptionBoxes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-center text-5xl font-extrabold'>Our Snack Boxes</h1>
        <button className='border border-black px-3 py-2 rounded-lg' onClick={handleNavigation}>
          Go to Subscription Boxes Catalog
        </button>
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
            onDelete={handleDelete}
            onUpdate={() => openEditModal(box)}
          />
        ))}
      </div>
      {isEditModalOpen && currentBox && (
        <SubscriptionBoxEditModal
          subscriptionBox={currentBox}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
};
