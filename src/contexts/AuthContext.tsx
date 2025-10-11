/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { AuthContextType } from "../interfaces/AuthContextType";
import type { AuthProviderProps } from "../interfaces/AuthProviderProps";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
    const [username, setUsername] = useState<string | null>(localStorage.getItem("USERNAME"));
    const [token, setToken] = useState<string | null>(localStorage.getItem("TOKEN"));

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    async function login(username: string, password: string) {
        try {
            const response = await axios.post(`${USER_API_BASE_URL}/login`, {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const token = response.data.token;

            localStorage.setItem("TOKEN", token);
            localStorage.setItem("USERNAME", username);

            setToken(token);
            setUsername(username);

            return token;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error logging in:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }

            return null;
        }
    }

    function logout() {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("TOKEN");

        localStorage.removeItem("SPOTIFY-TOKEN");
        localStorage.removeItem("SPOTIFY-USER-ID");

        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ username, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};