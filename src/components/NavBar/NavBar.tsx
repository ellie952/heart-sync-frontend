import { jwtDecode } from "jwt-decode"
import type { JwtPayloadType } from "../../interfaces/JwtPayloadType";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const { token, username, logout } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);
    const [searchUsername, setSearchUsername] = useState("");

    const navigate = useNavigate();

    function handleSearchUsername(e: ChangeEvent<HTMLInputElement>) {
        setSearchUsername(e.target.value);
    }

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<JwtPayloadType>(token);
            setUserId(decodedToken.id);
        } else {
            setUserId(null);
        }
    }, [token])

    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "rgba(236, 225, 225, 0.69)" }}>
            <div className="container-fluid">
                <img
                    src="/Images/Logo.svg"
                    style={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                        marginRight: "5px"
                    }}
                    onClick={() => navigate("/")}
                />
                <a className="navbar-brand" href="/">HeartSync</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userId !== null ? (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href={`/dashboard/${encodeURIComponent(userId)}`}>
                                        Dashboard
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href={`/profile/${encodeURIComponent(userId)}`}>
                                        Profile
                                    </a>
                                </li> */}
                                <li className="nav-item">
                                    <a className="nav-link " href="/generate-playlist">
                                        Generate Playlist
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="/new-post">
                                        New Post
                                    </a>
                                </li>
                            </ul>

                            {/* <li className="nav-item">
                                    <a className="nav-link " href="/spotify-connection">
                                        Spotify Connection
                                    </a>
                                </li>   */}
                            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3 mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <form className="d-flex" onSubmit={(e) => {
                                        e.preventDefault();
                                        navigate(`/search?query=${searchUsername}`);

                                    }}>
                                        <input
                                            className="form-control me-2"
                                            type="search"
                                            name="search"
                                            placeholder="Search users..."
                                            aria-label="Search"
                                            value={searchUsername}
                                            onChange={handleSearchUsername}

                                        />
                                        <button className="btn btn-outline-success" type="submit">
                                            Search
                                        </button>
                                    </form>
                                </li>
                                <li className="nav-item dropdown" >
                                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">@{username}</button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className="dropdown-item" href={`/profile/${encodeURIComponent(userId)}`}>My Profile</a></li>
                                        <li><a className="dropdown-item" href="/settings/edit-profile">Edit Profile</a></li>
                                        <li><a className="dropdown-item" href="/settings/password-reset">Reset Password</a></li>
                                        <li><a className="dropdown-item" href="/settings/delete-profile">Delete Profile</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="/">
                                            <button className="dropdown-item" onClick={() => {
                                                logout();
                                                <Link to="/"></Link>
                                            }}>Logout</button>
                                        </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* <li className="nav-item">
                                    <a className="nav-link" href="/settings">
                                        Settings
                                    </a>
                                </li> */}
                        </>
                    ) : (
                        <div className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">
                                    Register
                                </a>
                            </li>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar