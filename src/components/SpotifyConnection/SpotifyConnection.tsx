import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { ENVIRONMENT } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

function SpotifyConnection() {
    const [isConnectedToSpotify, setIsConnectedToSpotify] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { token } = useAuth();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/spotify`;

    async function handleSpotifyConnection(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setHasError(false);

        // call to login with spotify
        try {

            window.location.href = `${USER_API_BASE_URL}/login`;
            setIsConnectedToSpotify(true);

        } catch (error: unknown) {
            setHasError(true);
            console.error("Error logging into Spotify:", error);
        }
    }

    return (
        <>
            {token ? (
                <div>
                    <button onClick={handleSpotifyConnection}>
                        Connect to Spotify
                    </button>
                    {/* {!hasError && isConnectedToSpotify &&(
                <p style={{color: 'green'}}>
                    Successfully connected to Spotify!
                </p>
            )}
            {hasError && (
                <p style={{color: 'red'}}>
                    Error connecting to Spotify. Please try again.
                </p>
            )} */}
                </div>
            ) : (
                <p>
                    Please <Link to="/login">log in</Link> to connect to Spotify.
                </p>
            )}
        </>
    )
}

export default SpotifyConnection