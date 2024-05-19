"use client"
import AuthenticationService from "@/components/authentication/AuthenticationService";
import { getCookie, hasCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    authorities: [],
    username: '',
    enabled: true
  });

  if(!hasCookie('token')){
    router.push('/welcome');
  }

  const handleLogout = () => {
    AuthenticationService.logout();
    toast.success('Logout Success')
    router.push('/welcome');
  }

  const getUserProfile = async () => {
    const token = getCookie('token')
    try{
        if(token){
          const userData = await AuthenticationService.getProfile(token)
          setUser(userData.user);
        } else{
          
        }
    } catch (error) {
        console.log(error)
    }
  }
  if(user.id == ''){
    getUserProfile();
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
        <Image 
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
        <div className="bg-white py-10 w-[300px] sm:w-[500px] rounded-3xl shadow-xl flex flex-col gap-10 items-center justify-center">
          <p className="sm:text-3xl text-center">Welcome, {user.name}!</p>
          <p className="sm:text-xl text-center text-gray-500 px-10">Sorry, this website is currently under development.</p>
          <button onClick={handleLogout} className="bg-orange-300 w-[150px] py-3 rounded-md text-sm sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400">Logout</button>
        </div>
    </main>
  );
}
