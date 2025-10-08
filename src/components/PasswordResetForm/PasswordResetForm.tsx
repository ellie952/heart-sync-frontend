import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

function PasswordResetForm() {
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

        const token = localStorage.getItem("TOKEN");
        if (!token) {
            setHasError(true);
            console.error("You must be logged in to delete your profile.");
            return;
        }

        if ((newPassword === confirmedPassword) && (newPassword !== prevPassword)) {
            try {
                await axios.put(
                    `${USER_API_BASE_URL}/password`,
                    {
                        oldPassword: prevPassword,
                        newPassword: confirmedPassword
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                navigate("/login")
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error registering user:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        } else {
            setHasError(true);
            console.error("Password reset failed.");
        }
    }

    function handlePrevPassword(e: ChangeEvent<HTMLInputElement>) {
        setPrevPassword(e.target.value);
    }

    function handleNewPassword(e: ChangeEvent<HTMLInputElement>) {
        setNewPassword(e.target.value);
    }

    function handleConfirmedPassword(e: ChangeEvent<HTMLInputElement>) {
        setConfirmedPassword(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="Old password"
                value={prevPassword}
                onChange={handlePrevPassword}
                required
            />
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={handleNewPassword}
                required
            />
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmedPassword}
                onChange={handleConfirmedPassword}
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

export default PasswordResetForm;