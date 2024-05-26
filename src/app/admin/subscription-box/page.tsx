'use client'

import React, { useEffect, useState } from 'react'
import SubscriptionBoxService from '@/components/subscription-box/SubscriptionBoxService'
import { getCookie } from 'cookies-next';


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

export default function Page() {
    const [subscriptionBoxes, setSubscriptionBoxes ] = useState<SubscriptionBox[]>([]);


    useEffect(() => {
    const getSubscriptionBox = async () => {
        try {
          const token = getCookie('token');
          if (token) {
            const subscriptionBoxesList = await SubscriptionBoxService.getSubscriptionBox( token);
            setSubscriptionBoxes(subscriptionBoxesList);
          }
        } catch (error) {
          console.log("Error", error);
        }
      };
      getSubscriptionBox();
    },[]);

    console.log(subscriptionBoxes)
  return (
    <div>
                  {/* You can render your subscription boxes here */}
                  {subscriptionBoxes.map(box => (
                <div key={box.id}>
                    <h3>{box.name}</h3>
                    <p>{box.description}</p>
                    {/* Render items if needed */}
                    <ul>
                        {box.items.map(item => (
                            <li key={item.id}>{item.name}: {item.quantity}</li>
                        ))}
                    </ul>
                </div>
            ))}
    </div>
  )
}
