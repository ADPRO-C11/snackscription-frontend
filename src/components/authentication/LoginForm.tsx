import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthenticationService from './AuthenticationService';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';

export const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{
            const userData = await AuthenticationService.login(email, password)
            if(userData.token){
                toast.success("Login Success!")
                setCookie('token', userData.token)
                if(userData.role === 'ADMIN'){
                    router.push("/admin")
                }
                else{
                    router.push("/")
                }
            } else{
                toast.error("Email or password is invalid!");
            }
        } catch (error) {
            toast.error("An unknown error occured!");
        }
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 items-center justify-center '>
            <h1 className='text-3xl font-bold'>Login</h1>
            <div> 
                <input type="email" name="email" placeholder='Email' className='border border-black p-2 rounded-md' onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div> 
                <input type="password" name="password" placeholder='Password' className='border border-black p-2 rounded-md' onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" className='bg-orange-300 w-full py-3 rounded-md sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400'>Login</button>
            <Link href="./register" className='hover:text-orange-600 focus:text-orange-600'>{"Don't have an account yet?"}</Link>
        </form>
    </div>
  )
}
