'use client'

import AuthenticationService from '@/components/authentication/AuthenticationService';
import { Navbar } from '@/components/common/Navbar';
import { NavbarAdmin } from '@/components/common/NavbarAdmin';
import { SubscriptionBoxCatalogAll } from '@/components/shop/SubscriptionBoxCatalogAll';
import { getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const role = getCookie('role') as string;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        const checkAuthentication = async () => {
        if (!hasCookie('token')) {
            router.push('/welcome');
        } else {
            const token = getCookie('token');
            try {
            if (token) {
                const userData = await AuthenticationService.getProfile(token);
                setUser(userData.user);
            }
            } catch (error) {
            console.log(error);
            }
            setIsLoading(false);
        }
        };
        checkAuthentication();
    }, [router]);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
        );
    }

    else {
        return (
            <div className='flex flex-col'>
        {role === 'ADMIN' ? (
            <NavbarAdmin username={user.name} /> // Render NavbarAdmin for admin role
        ) : (
            <Navbar username={user.name} /> // Render Navbar for other roles
        )}
                <div className='h-screen m-32'>
                    <SubscriptionBoxCatalogAll />
                </div>
            </div>
        );
    }
        
}
