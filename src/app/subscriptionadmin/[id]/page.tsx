import { AdminSubscription }   from "@/components/subscriptionadmin/AdminSubscription";
import React from 'react';

export default function page({params}:any) {
    return (
        <div>
            <div>Subscription</div>
            <AdminSubscription id={params.id} />
        </div>
    )
}