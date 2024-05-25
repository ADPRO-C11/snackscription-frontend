"use client";
import AuthenticationService from "@/components/authentication/AuthenticationService";
import { Navbar } from "@/components/common/Navbar";
import { AboutUs } from "@/components/home/AboutUs";
import { MainImage } from "@/components/home/MainImage";
import { OurPlan } from "@/components/home/OurPlan";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!hasCookie('token')) {
      setIsAuthenticated(false);
      router.push('/welcome');
    } else {
      setIsAuthenticated(true);
      getUserProfile();
    }
  }, [router]);

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
  }

  return (
    <main>
      {isAuthenticated ? (
        <>
          <Navbar username={user.name} />
          <div className="mt-16">
            <MainImage />
            <OurPlan />
            <AboutUs />
          </div>
        </>
        
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
