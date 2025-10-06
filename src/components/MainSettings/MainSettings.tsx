import { Link } from "react-router"

function MainSettings() {
    return (
        <div>
            <Link to="/settings/edit-profile">Edit Profile</Link>
            <Link to="/settings/password-reset">Reset Password</Link>
            <Link to="/settings/delete-profile">Delete Profile</Link>
        </div>
    )
}

export default MainSettings