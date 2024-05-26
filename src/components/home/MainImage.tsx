import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'

export const MainImage = () => {
  return (
    <div className="relative h-[700px] overflow-hidden ">
        <Image 
            src="/static/images/Snacks.jpg"
            alt="Image of Snacks"
            quality={100}
            width={screen.width}
            height={700}
            style={{ objectFit: 'cover', filter: 'brightness(50%) blur(3px)', zIndex: -1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-10 items-center justify-center text-white px-56 py-20">
            <h1 className="text-5xl font-extrabold text-center">Discover the Ultimate Snack Experience!</h1>
            <p className="text-center font-light text-xl">
            {"Transform your snack time with "}
            <span className="text-orange-400 font-bold">Snackscription</span>
            {", the premier subscription-based snack shop! Indulge in a curated selection of the finest, most delicious snacks delivered straight to your door each month. Whether you crave sweet, savory, or something in between, we've got you covered."}
            </p>
            <Link href="/shop">
            <button className="border border-gray-100 px-12 py-4 rounded-full text-2xl font-medium bg-gray-600 bg-opacity-30 transition duration-300 ease-in-out hover:bg-opacity-60 flex justify-center items-center gap-3">
                Shop Now <FaShoppingCart />
            </button>
            </Link>
        </div>
    </div>
  )
}
