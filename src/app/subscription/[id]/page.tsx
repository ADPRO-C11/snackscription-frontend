import { Subscription } from '@/components/subscription/Subscription'
import React from 'react'

export default function page({params}:any) {
  return (
    <div>
        <div>Your Subscription</div>
        <Subscription id={params.id} />
    </div>
  )
}
