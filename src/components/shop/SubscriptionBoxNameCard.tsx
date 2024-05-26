import React from 'react';
import { useRouter } from 'next/navigation';

interface SubscriptionBoxNameCardProps {
  name: string;
}

export const SubscriptionBoxNameCard: React.FC<SubscriptionBoxNameCardProps> = ({ name }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/box?name=${name}`);
  };

  return (
    <div className='border border-black p-5 rounded-xl flex flex-col gap-5 transform-container' onClick={handleClick}>
      <div className='border border-black rounded-lg image-container relative'>
        <img src='/static/images/snack box.jpg' alt='Description of the image' className='rounded-lg absolute inset-0 w-full h-full object-cover' />
      </div>
      <h1 className='font-bold text-center'>{name}</h1>
   
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
