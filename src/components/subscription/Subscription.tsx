import React, { useState } from 'react'
import SubscriptionService from './SubscriptionService';
import { getCookie } from 'cookies-next';

export const Subscription = async ({id}:any) => {
    const [subscription, setSubscription] = useState(Object);
    const token = getCookie('token');
    if(token){
        const subscriptionData = await SubscriptionService.getSubscriptionById(id, token);
        setSubscription(subscriptionData);
    }
    
    return (
        <div>
            <div>id : {subscription.id}</div>
            <div>unique code : {subscription.uniqueCode}</div>
        </div>
        
    )
}
