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
    <main className="pt-16">
      {isAuthenticated ? (
        <>
          <Navbar username={user.name} />
          <MainImage />
          <OurPlan />
          <AboutUs />
          <div className="flex">
            <div>
              <p></p>
            </div>
          </div>
        </>
        
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="bg-white py-10 w-[300px] sm:w-[500px] rounded-3xl shadow-xl flex flex-col gap-10 items-center justify-center">
            <p className="sm:text-3xl text-center">Loading...</p>
          </div>
        </div>
      )}
    </main>
  );
}
