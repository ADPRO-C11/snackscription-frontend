import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthenticationService from './AuthenticationService';
import toast from 'react-hot-toast';

export const RegisterForm = () => {

    const router = useRouter();   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    })

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const response = await AuthenticationService.register(formData);
        setFormData({
            name: formData.name,
            email: formData.email,
            password: '',
            role: 'USER',
        });
        
        if(response.statusCode != 201){
            if(response.message == 'User with the email ' + formData.email + ' already exist!'){
                setFormData({
                    name: formData.name,
                    email: '',
                    password: '',
                    role: 'USER',
                });
            } else {
                setFormData({
                    name: formData.name,
                    email: formData.email,
                    password: '',
                    role: 'USER',
                });
            }
            toast.error(response.message);
        }
        else{
            toast.success('User registered succesfully!');
            router.push("./login");
            router.refresh()
        }
    };
  return (
    <div>
         <form onSubmit={handleSubmit}  className='flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <div>
                <input type="text" name="name" placeholder='Name' className='border border-black p-2 rounded-md' value={formData.name} onChange={handleInputChange} required/>
            </div>
            <div>
                <input type="email" name="email"  placeholder='Email' className='border border-black p-2 rounded-md' value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div>
                <input type="password" name="password" placeholder='Password' className='border border-black p-2 rounded-md' value={formData.password} onChange={handleInputChange} required/>
            </div>
            <button type="submit" className='bg-orange-300 w-full py-3 rounded-md sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400'>Register</button>
            <Link href="./login" className='hover:text-orange-600 focus:text-orange-600'>{"Already have an account?"}</Link>
        </form>
    </div>
  )
}
