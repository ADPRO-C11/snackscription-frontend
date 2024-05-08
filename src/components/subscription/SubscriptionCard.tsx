import React from 'react'

export const SubscriptionCard = ({ subscription }: any) => {
  return (
    <div className='border-gray border-2 p-5 rounded-xl'>
        <div>Code : {subscription.uniqueCode}</div>
        <div>Subscription Type : {subscription.type}</div>
        <div>Shipping Address : {subscription.shippingAddress.address}</div>
        <div>Status : {subscription.status}</div>
    </div>
  )
}
