import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

function EditProfileForm() {
    const [prevUsername, setPrevUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [hasError, setHasError] = useState(false);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            const token = localStorage.getItem("TOKEN");
            if (!token) {
                setHasError(true);
                console.error("No token found.");
                return;
            }

            try {
                const response = await axios.get(`${USER_API_BASE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const { username } = response.data.data;
                setPrevUsername(username);
                setNewUsername(username);
            } catch (error) {
                setHasError(true);
                console.error("Error fetching user data:", error);
            }
        }

        getUserData()
    }, [])

    function handleNewUsername(e: ChangeEvent<HTMLInputElement>) {
        setNewUsername(e.target.value);
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

        if (newUsername) {
            try {
                await axios.put(
                    `${USER_API_BASE_URL}/username`,
                    {
                        oldUsername: prevUsername,
                        newUsername: newUsername
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
                value={newUsername}
                onChange={handleNewUsername}
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