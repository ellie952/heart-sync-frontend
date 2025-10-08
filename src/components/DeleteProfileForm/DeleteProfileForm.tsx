import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router";

function DeleteProfileForm() {
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

        if (!username || !password) {
            setHasError(true);
            console.error("Username and password required.");
        }

        const token = localStorage.getItem("TOKEN");
        if (!token) {
            setHasError(true);
            console.error("You must be logged in to delete your profile.");
        }

        try {
            await axios.delete(USER_API_BASE_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: { password }
            });

            navigate("/login");
        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error deleting user:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Confirm username"
                value={username}
                onChange={handleUsername}
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={password}
                onChange={handlePassword}
            />
            <input type="submit" value="Delete My Profile" />
            {hasError && (
                <p>
                    Deletion failed. Please try again.
                </p>
            )}
        </form>
    )
}

export default DeleteProfileForm