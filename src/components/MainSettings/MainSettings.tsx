import { Link, useNavigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

function MainSettings() {
    const { logout } = useAuth();

    const navigate = useNavigate();

    return (
        <div>
            <Link to="/settings/edit-profile">Edit Profile</Link>
            <Link to="/settings/password-reset">Reset Password</Link>
            <Link to="/settings/delete-profile">Delete Profile</Link>
            <button onClick={() => {
                logout();
                navigate("/");
            }}>
                Log out
            </button>
        </div>
    )
}

export default MainSettings