import { jwtDecode } from "jwt-decode"
import type { JwtPayloadType } from "../../interfaces/JwtPayloadType";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function NavBar() {
    const { token } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<JwtPayloadType>(token);
            setUserId(decodedToken.id);
        }
    }, [token, userId])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">HeartSync</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userId !== null && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/dashboard/${userId}`}>
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/profile/${userId}`}>
                                        Profile
                                    </a>
                                </li>
                            </>
                        )}
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
                        {userId !== null && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/generate-playlist">
                                        Generate Playlist
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/new-post">
                                        New Post
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/spotify-connection">
                                        Spotify Connection
                                    </a>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="/settings">
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar