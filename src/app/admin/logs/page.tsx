"use client";
import AuthenticationService from "@/components/authentication/AuthenticationService";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubscriptionBoxService from "@/components/subscription-box/SubscriptionBoxService";
import { NavbarAdmin } from "@/components/common/NavbarAdmin";

interface Log {
  id: string;
  logString: string;
  subBoxId: string;
  date: string;
}

export default function Logs() {
  const router = useRouter();
  const [logs, setLogs] = useState<Log[]>([]);
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
      fetchLogs();
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
  };

  const fetchLogs = async () => {
    const token = getCookie('token');
    try {
      if (token) {
        const logData: Log[] = await SubscriptionBoxService.getLogs(token);
        setLogs(logData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {isAuthenticated ? (
        <>
          <NavbarAdmin username={user.name} />
          <div className="mt-16 p-8">
            <h1 className="text-2xl font-bold mb-4">Subscription Box Logs</h1>
            <div className="space-y-4">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div key={log.id} className="p-4 border rounded">
                    <p><strong>ID:</strong> {log.id}</p>
                    <p><strong>Log:</strong> {log.logString}</p>
                    <p><strong>Subscription Box ID:</strong> {log.subBoxId}</p>
                    <p><strong>Date:</strong> {log.date}</p>
                  </div>
                ))
              ) : (
                <p>No logs found.</p>
              )}
            </div>
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
