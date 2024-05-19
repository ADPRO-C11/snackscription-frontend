"use client"

import React from 'react'
import Image from 'next/image'
import { RegisterForm } from '@/components/authentication/RegisterForm'

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-32 gap-10 bg-black bg-opacity-50">
    <Image 
        className='blur-sm'
        src={"/static/images/Snacks.jpg"}
        alt="Image of Snacks"
        quality={100}
        fill
        sizes="100vw"
        style={{
            objectFit: 'cover',
            zIndex: -1
        }}
    />
    <div className="bg-white w-[300px] sm:w-[350px] py-8 sm:py-10 rounded-2xl shadow-xl flex flex-col gap-10 items-center justify-center">
        <RegisterForm />
    </div>
    </main>
  )
}
