import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ENVIRONMENT } from "../../constants";

function PasswordResetForm() {
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const { token, logout } = useAuth();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

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


                logout();
                navigate("/login");
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
        <>
            {token ? (
                <form 
                    style={{margin:"60px", width:"400px"}}
                    aria-label="Password Reset"
                    onSubmit={handleSubmit}
                >

                     <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floating-old-password"
                            placeholder="Old password"
                            value={prevPassword}
                            onChange={handlePrevPassword}
                            required
                        />
                         <label htmlFor="floating-old-password">Old Password</label>
                    </div>
                     <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floating-new-password"
                            placeholder="new password"
                            value={newPassword}
                            onChange={handleNewPassword}
                            required
                        />
                         <label htmlFor="floating-old-password">New Password</label>
                    </div>
                     <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floating-confirm-password"
                            placeholder="Confirm new password"
                            value={confirmedPassword}
                            onChange={handleConfirmedPassword}
                            required
                        />
                         <label htmlFor="floating-old-password">Confirm New Password</label>
                    </div>
                    <input type="submit" />
                    {hasError && (
                        <p>
                            Password reset failed. Please try again.
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

export default PasswordResetForm;