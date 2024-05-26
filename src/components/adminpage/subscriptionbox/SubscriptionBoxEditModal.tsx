import React, { useState } from 'react';

interface SubscriptionBox {
  id: string;
  name: string;
  type: string;
  price: number;
  items: { id: string; name: string; quantity: number; }[];
  description: string;
}

interface SubscriptionBoxEditModalProps {
  subscriptionBox: SubscriptionBox;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBox: SubscriptionBox) => void;
}

export const SubscriptionBoxEditModal: React.FC<SubscriptionBoxEditModalProps> = ({ subscriptionBox, isOpen, onClose, onSave }) => {
  const [formState, setFormState] = useState<SubscriptionBox>({ ...subscriptionBox });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Edit Subscription Box</h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            Price:
            <input
              type='number'
              name='price'
              value={formState.price}
              onChange={handleChange}
              className='block w-full mt-1 p-2 border rounded'
            />
          </label>
          <label className='block mb-2'>
            Description:
            <textarea
              name='description'
              value={formState.description}
              onChange={handleChange}
              className='block w-full mt-1 p-2 border rounded'
            />
          </label>
          <div className='flex justify-end gap-4'>
            <button type='button' onClick={onClose} className='border border-gray-500 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
              Cancel
            </button>
            <button type='submit' className='border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
