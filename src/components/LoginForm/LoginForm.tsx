import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

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
            await login(username, password);

            const savedToken = localStorage.getItem("TOKEN");
            if (!savedToken) {
                setHasError(true);
                console.error("Login failed: token not found.");
            } else {
                navigate("/dashboard");
            }
        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error logging in user:", error.response?.data || error.message);
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