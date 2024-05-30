
import React from 'react';
import { getCookie } from 'cookies-next';

interface SubscriptionBoxCardProps {
  id: string;
  name: string;
  type: string;
  price: number;
  items: { id: string; name: string; quantity: number; }[];
  description: string;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export const SubscriptionBoxCard: React.FC<SubscriptionBoxCardProps> = ({ id, name, type, price, items, description, onDelete, onUpdate }) => {
  const role = getCookie('role') as string;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this subscription box?')) {
      onDelete(id);
    }
  };

  return (

    <div className='border border-black p-5 rounded-xl flex flex-col gap-5 transform-container'>
      <div className='border border-black rounded-lg image-container relative'>
        <img src='/static/images/snack box.jpg' alt='Description of the image' className='rounded-lg absolute inset-0 w-full h-full object-cover' />
      </div>
      <h1 className='font-bold text-center'>{name}</h1>

      <p>{type}</p>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} (Quantity: {item.quantity})</li>
        ))}
      </ul>
      {role === 'ADMIN' && (
        <div className='flex gap-2'>
          <button className='border border-blue-500 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600' onClick={onUpdate}>Update</button>
          <button className='border border-red-500 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600' onClick={handleDelete}>Delete</button>
        </div>
      )}
      <style jsx>{`
        .transform-container {
          transition: transform 0.3s ease;
        }

        .transform-container:hover {
          transform: scale(1.05);
        }

        .image-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 200px; /* Fixed height for all image containers */
        }

        .image-container img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

