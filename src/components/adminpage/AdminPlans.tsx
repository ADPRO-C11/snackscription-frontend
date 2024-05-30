import React from 'react';

export const AdminPlans = () => {
  return (
    <div className='pb-16' style={{ backgroundColor: "#E6E6FA" }}>
      <div className='flex flex-col justify-center items-center p-16 px-32 gap-16'>
        <h1 className='text-5xl font-extrabold text-center'>Our Plans</h1>
        <div className='grid grid-cols-3 gap-24'>
          <div className='border border-gray-300 rounded-2xl p-20 bg-orange-100 flex flex-col items-center justify-center gap-3 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl'>
            <h1 className='text-center text-4xl font-semibold'>Monthly</h1>
            <br></br>
            <p className='text-justify text-wrap text-gray-500'>Receive a box of gourmet snacks every month, perfect for those who love trying new treats regularly.</p>
          </div>
          <div className='border border-gray-300 rounded-2xl p-20 bg-orange-100 flex flex-col items-center justify-center gap-3 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl'>
            <h1 className='text-center text-4xl font-semibold'>Quarterly</h1>
            <br></br>
            <p className='text-justify text-wrap text-gray-500'>Get a curated snack box every three months, ideal for enjoying snacks over a more extended period.</p>
          </div>
          <div className='border border-gray-300 rounded-2xl p-20 bg-orange-100 flex flex-col items-center justify-center gap-3 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl'>
            <h1 className='text-center text-4xl font-semibold'>Semi-Annual</h1>
            <br></br>
            <p className='text-justify text-wrap text-gray-500'>Receive a large selection of premium snacks every six months, perfect for stocking up and savoring over a longer time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
