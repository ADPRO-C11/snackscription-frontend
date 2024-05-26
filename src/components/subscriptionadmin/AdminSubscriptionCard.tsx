import React from 'react'

export const AdminSubscriptionCard = ({ subscriptionadmin }: any) => {
    return (
        <div className='border-gray border-2 p-5 rounded-xl'>
            <div>Unique Code : {subscriptionadmin.uniqueCode}</div>
            <div>Subscription Type : {subscriptionadmin.type}</div>
            <div>Status : {subscriptionadmin.status}</div>
        </div>
    )
}