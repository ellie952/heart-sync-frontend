import { Link, useNavigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

function MainSettings() {
    const { token, logout } = useAuth();

    const navigate = useNavigate();

    return (
        <div>
            {token ? (
                <>
                    <Link to="/settings/edit-profile">Edit Profile</Link>
                    <Link to="/settings/password-reset">Reset Password</Link>
                    <Link to="/settings/delete-profile">Delete Profile</Link>
                    <button onClick={() => {
                        logout();
                        navigate("/");
                    }}>
                        Log out
                    </button>
                </>
            ) : (
                <p>
                    Please <Link to="/login">log in</Link> to access Settings.
                </p>
            )}
        </div>
    )
}

export default MainSettings