import React from 'react'

interface SubscriptionBoxCardProps {
  id: string;
  name: string;
  type: string;
  price: number;
  items: { id: string; name: string; quantity: number; }[];
  description: string;
}

export const SubscriptionBoxCard: React.FC<SubscriptionBoxCardProps> = ({ id, name, type, price, items, description }) => {
  return (
    <div className='border border-black p-5 rounded-xl flex flex-col gap-5'>
      <div className='border border-black p-32 rounded-lg'></div>
      <h1 className='font-bold'>{name}</h1>
      <p>{type}</p>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} (Quantity: {item.quantity})</li>
        ))}
      </ul>
    </div>
  )
}
