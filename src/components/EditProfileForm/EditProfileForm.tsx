import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ENVIRONMENT } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

function EditProfileForm() {
    const [prevUsername, setPrevUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [hasError, setHasError] = useState(false);

    const { token } = useAuth();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
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
                console.error("Error editing user data:", error);
            }
        }

        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleNewUsername(e: ChangeEvent<HTMLInputElement>) {
        setNewUsername(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

        if (!token) {
            setHasError(true);
            console.error("You must be logged in to edit your profile.");
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
                    console.error("Error updating user:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        }
    }

    return (
        <>
            {token ? (
                <form
                    aria-label="Edit Profile"
                    onSubmit={handleSubmit}
                >
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
                            Username reset failed. Please try again.
                        </p>
                    )}
                </form>
            ) : (
                <p>
                    Please <Link to="/login">log in</Link> to access Settings.
                </p>
            )}
        </>
    )
}

export default EditProfileForm;