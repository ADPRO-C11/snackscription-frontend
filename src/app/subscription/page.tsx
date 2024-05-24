import { Navbar } from '@/components/common/Navbar'
import { SubscriptionContainer } from '@/components/subscription/SubscriptionContainer'
import React from 'react'

export default function subscriptionPage() {
   return (
    <>
      <Navbar />
      <div className='mt-16'>
        <SubscriptionContainer />
      </div>
    </>
  )
}
