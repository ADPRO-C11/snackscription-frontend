import React from 'react';

export const AboutAdmin = () => {
  return (
    <div style={{backgroundColor: "#C6E2FF"}}>
        <div className='flex flex-col justify-center items-center p-20 px-32 gap-16'>
            <h1 className='text-5xl font-extrabold text-center text-gray-800'>About Us</h1>
            <div className='grid grid-cols-2 gap-32'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>Snackscription</h1>
                    <br></br>
                    <p className='text-justify text-xl font-light text-gray-800'>{"Snackscription is a subscription-based snack shop offering curated snack boxes in monthly, quarterly, and semi-annual plans. Designed for snack enthusiasts and convenience seekers, it delivers gourmet snacks directly to customers' doors. The platform features efficient subscription management, comprehensive rating and review systems, and personalized snack recommendations, ensuring a high-quality and satisfying snack experience."}</p>
                </div>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>Kelompok C-11</h1>
                    <br></br>
                    <p className='text-justify text-xl font-light text-gray-800'>{"This project was developed for the final project of Advanced Programming course held at the Faculty of Computer Science of University of Indonesia. Our team consists of Reyhan Zada Virgiwibowo, Muhammad Faishal Adly Nelwan, Yasmine Putri Viryadhani, Ester Gracia, and Sita Amira Syarifah. We utilized Spring Boot for the backend, Nextjs for the frontend, and Supabase for the database."}</p>
                </div>
            </div>
        </div>
    </div>
  );
}