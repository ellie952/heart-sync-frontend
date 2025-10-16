import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ENVIRONMENT } from "../../constants";

function DeleteProfileForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const { token, logout } = useAuth();

    const navigate = useNavigate();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

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
            return;
        }

        if (!token) {
            setHasError(true);
            console.error("You must be logged in to delete your profile.");
            return;
        }

        try {
            await axios.delete(USER_API_BASE_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: { password }
            });

            logout()
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
        <>
            {token ? (
                <form
                    style={{margin:"60px", width:"400px"}}
                    aria-label="Delete Profile"
                    onSubmit={handleSubmit}
                >
                    <div className="form-floating mb-3"> 
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Confirm username"
                            value={username}
                            onChange={handleUsername}
                        />
                        <label htmlFor="floatingConfirmUserName">Confirm Username</label>
                    </div>
                    <div className="form-floating mb-3"> 
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <label htmlFor="floatingConfirmUserName">Confirm Password</label>
                    </div>
                    <input type="submit" value="Delete My Profile" />
                    {hasError && (
                        <p>
                            Deletion failed. Please try again.
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

export default DeleteProfileForm