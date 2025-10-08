import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

        try {
            const response = await axios.post(`${USER_API_BASE_URL}/login`, {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const token = response.data;

            localStorage.setItem("TOKEN", token);
            localStorage.setItem("USERNAME", username);

            navigate("/");
        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error registering user:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
            />
            <input type="submit" />
            {hasError && (
                <p>
                    Login failed: All fields must be valid.
                </p>
            )}
        </form>
    )
}

export default LoginForm