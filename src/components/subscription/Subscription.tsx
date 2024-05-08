import React from 'react'
import SubscriptionService from './SubscriptionService';

export const Subscription = async ({id}:any) => {
    const subscriptionData = await SubscriptionService.getSubscriptionById(id);
    console.log(subscriptionData);
    return (
        <div>
            <div>id : {subscriptionData.id}</div>
            <div>unique code : {subscriptionData.uniqueCode}</div>
        </div>
        
    )
}
