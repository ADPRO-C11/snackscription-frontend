import React, { useState } from 'react';
import SubscriptionBoxService from '@/components/subscription-box/SubscriptionBoxService';
import { getCookie } from 'cookies-next';

interface CreateSubscriptionBoxFormProps {
  onCreate: () => void;
}

const CreateSubscriptionBoxForm: React.FC<CreateSubscriptionBoxFormProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie('token');
    if (token) {
      const subscriptionBox = { name, type, price, description };
      try {
        await SubscriptionBoxService.createSubscriptionBox(subscriptionBox, token as string);
        onCreate(); // Callback to refresh the subscription boxes list
      } catch (error) {
        console.error('Failed to create subscription box:', error);
      }
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Create Subscription Box</h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='block w-full mt-1 p-2 border rounded'
              required
            />
          </label>
          <label className='block mb-2'>
            Type:
            <input
              type='text'
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='block w-full mt-1 p-2 border rounded'
              required
            />
          </label>
          <label className='block mb-2'>
            Price:
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className='block w-full mt-1 p-2 border rounded'
              required
            />
          </label>
          <label className='block mb-2'>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='block w-full mt-1 p-2 border rounded'
              required
            />
          </label>
          <div className='flex justify-end gap-4'>
            <button type='button' onClick={onCreate} className='border border-gray-500 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
              Cancel
            </button>
            <button type='submit' className='border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionBoxForm;
