import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from "next/router";
import { api } from "../services/api";

type SignInData = {
    email: string;
    password: string;
}

type User = {
    name: string;
    email: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any): JSX.Element {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'smartvaga.token': token } = parseCookies();

        if (token) {
            api.get('/profile')
                .then(response => setUser(response.data))
                .catch(err => console.error(err))
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        const resp = await api.post("/login", {
            email,
            password
        });

        const { token, user } = resp.data;

        setCookie(undefined, "smartvaga.token", token, {
            maxAge: 60 * 60 * 1 // 1 hour
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user);

        Router.push("/dashboard");
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}