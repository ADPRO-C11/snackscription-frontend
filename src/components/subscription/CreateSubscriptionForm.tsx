'use client'

import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import SubscriptionService from './SubscriptionService';
import { getCookie } from 'cookies-next';
import AuthenticationService from '../authentication/AuthenticationService';

export const CreateSubscriptionForm = () => {
    const router = useRouter();

    useEffect(() => {
        const getUserProfile = async () => {
            const token = getCookie('token');
            try {
                if (token) {
                    const userData = await AuthenticationService.getProfile(token);
                    setUser(userData.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserProfile();
    }, []);

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const [subscription, setSubscription] = useState({
        type: "", 
        shippingAddress: {
            address: "",
            city: "",
            phoneNumber:"",
            postalCode:"",
            province:"",
        },
        subscriptionBoxId: "123",
        userId: ""
    });


    const handleType = (event: any) => {
        setSubscription((prevState) => ({
            ...prevState, ["type"]: event.target.value
        }))
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
    
        setSubscription((prevState) => ({
            ...prevState,
            shippingAddress: {
                ...prevState.shippingAddress,
                [name]: value
            }
        }));

        console.log(subscription);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{
            const token = getCookie('token');
            if(token){
                subscription["type"] = subscription.type.toUpperCase()
                subscription["userId"] = user.id;
                await SubscriptionService.createSubscription(subscription, token);
                router.push("/subscription")
            }
            
        } catch (error) {
            console.log("Error", error);
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit} method='post'>
            <div className='grid grid-cols-1 gap-5 p-8'> 
                <h1 className='text-2xl font-bold'>Create Subscription</h1>
                <div className='flex flex-col'>
                    <label>Subscription Type</label>
                    <select id="type" name="type" className=' border-slate-300 border-2 p-2 rounded-lg' onChange={handleType}>
                        <option selected={true} disabled={true}>Select Subscription Type</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Semi-Annual</option>
                    </select>
                </div>
                
                <label>Shipping Address</label>
                <div className='flex flex-col'>
                        <label>Address</label>
                        <input 
                            id="address" 
                            name="address"  
                            value={subscription.shippingAddress.address} 
                            required={true} 
                            className='border-slate-300 border-2 p-2 rounded-lg' 
                            onChange={handleChange}
                        />

                        <label className='mt-2'>City</label>
                        <input 
                            id="city" 
                            name="city" 
                            value={subscription.shippingAddress.city} 
                            required={true}
                            className='border-slate-300 border-2 p-2 rounded-lg' 
                            onChange={handleChange}
                        
                        />

                        <label className='mt-2'>Province</label>
                        <input 
                            id="province" 
                            name="province" 
                            value={subscription.shippingAddress.province} 
                            required={true} 
                            className='border-slate-300 border-2 p-2 rounded-lg' 
                            onChange={handleChange}
                        />

                        <label className='mt-2'>Postal Code</label>
                        <input 
                            id="postalCode" 
                            name="postalCode" 
                            value={subscription.shippingAddress.postalCode} 
                            required={true} 
                            className='border-slate-300 border-2 p-2 rounded-lg' 
                            onChange={handleChange}
                        />

                        <label className='mt-2'>Phone Number</label>
                        <input 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            value={subscription.shippingAddress.phoneNumber} 
                            required={true} 
                            className='border-slate-300 border-2 p-2 rounded-lg' 
                            onChange={handleChange}
                        />
                </div>
                <input 
                    type="submit" 
                    value="Create Subscription" 
                    className='bg-orange-300 rounded-lg p-3 hover:bg-orange-200'/>
            </div>
        </form>
    </>
  )
}
