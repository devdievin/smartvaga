import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from "../services/api";

type SignInData = {
    email: string;
    password: string;
}

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    birth_date: Date;
    cars: any[];
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => Promise<void>
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
    }, []);

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await api.post("/login", {
                email,
                password
            });

            const { token, user } = response.data;

            setCookie(undefined, "smartvaga.token", token, {
                maxAge: 60 * 60 * 1 // 1 hour
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            setUser(user);

            Router.push("/dashboard");
        } catch (err) {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                alert(err.response.data);
                console.error("Response:", err.response);
            } else if (err.request) {
                // The client never received a response, and the request was never left
                console.error("Request:", err.request);
            } else {
                // Anything else
                console.log('Error', err.message);
            }
        }
    }

    async function signOut() {
        setUser(null);
        destroyCookie(undefined, "smartvaga.token");
        Router.push("/");
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}