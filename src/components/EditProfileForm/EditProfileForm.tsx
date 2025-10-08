import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

function EditProfileForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [hasError, setHasError] = useState(false);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    const navigate = useNavigate();

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handleEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

        const token = localStorage.getItem("TOKEN");
        if (!token) {
            setHasError(true);
            console.error("You must be logged in to delete your profile.");
            return;
        }

        if (username && email) {
            try {
                await axios.put(
                    `${USER_API_BASE_URL}/update`, // endpoint doesn't exist, we'll need something like this or similar
                    {
                        username,
                        email
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                navigate("/settings");
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error registering user:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
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
                required
            />
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={handleEmail}
                required
            />
            <input type="submit" />
            {hasError && (
                <p>
                    Password reset failed. Please try again.
                </p>
            )}
        </form>
    )
}

export default EditProfileForm;