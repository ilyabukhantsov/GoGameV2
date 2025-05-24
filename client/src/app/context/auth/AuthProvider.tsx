import { useEffect, useState } from 'react';
import {AuthContext} from './useAuth';
import type { ResponseData, User } from '../../../shared/types/auth/auth';

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/refresh', {
                    credentials: 'include',
                });
                console.log('res: ', res);
                console.log('data: ', await res.json());
                const data: ResponseData = await res.json();
                setUser(data.user);
                setIsLoading(false);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        isAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try{
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                credentials: 'include',
              })
            if(!res.ok) throw new Error(`Login error`)
            const data: ResponseData = await res.json();
            localStorage.setItem('token', JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }))
            setUser(data.user);
            setIsLoading(false);
        } catch {
            setUser(null);
        } finally{ 
            setIsLoading(false);
        }
    }

    const register = async (email: string, password: string) => {
        try{
            const res = await fetch('http://localhost:5000/api/registration', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                credentials: 'include',
              })
            if(!res.ok) throw new Error(`Login error`)
            const data: ResponseData = await res.json();
            localStorage.setItem('token', JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }))
            setUser(data.user);
            setIsLoading(false);
        } catch {
            setUser(null);
        } finally{ 
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
            fetch('http://localhost:5000/api/logout');
            localStorage.removeItem('token');
            setUser(null);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}