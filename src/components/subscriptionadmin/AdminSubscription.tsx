import React from 'react'
import AdminSubscriptionService  from "./AdminSubscriptionService";

export const AdminSubscription = async ({id}:any) => {
    const adminSubscriptionData = await AdminSubscriptionService.getSubscriptionById(id);
    return (
        <div>
            <div>ID: {adminSubscriptionData.id}</div>
            <div>Unique Code : {adminSubscriptionData.uniqueCode}</div>
            <div>Subscription Type : {adminSubscriptionData.type}</div>
            <div>Status : {adminSubscriptionData.status}</div>
        </div>
    )
}