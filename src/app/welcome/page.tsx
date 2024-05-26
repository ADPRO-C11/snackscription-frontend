import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function welcomePage() {
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
            <div className="bg-white w-[300px] sm:w-[400px] py-8 sm:py-10 rounded-2xl shadow-xl flex flex-col gap-10 items-center justify-center">
                <div className='flex flex-col gap-5 px-20 sm:px-0'>
                    <p className="text-2xl sm:text-3xl text-center">Welcome to <br></br><b>Snackscription</b></p>
                    <p className='text-gray-500 text-md text-center'>Satisfy Your Cravings, One Bite at a Time!</p>
                </div>
                <div className='flex flex-col gap-5'>
                    <Link href={"/auth/login"}><button className='bg-orange-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400'>Login</button></Link>
                    <Link href={"/auth/register"}><button className='bg-orange-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400'>Register</button></Link>
                </div>
            </div>
        </main>
    )
}