import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";

function SpotifyConnection(){
    const [isConnectedToSpotify, setIsConnectedToSpotify] = useState(false);
    const [hasError, setHasError] = useState(false);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/spotify`; 

    async function handleSpotifyConnection(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        setHasError(false);

        // call to login with spotify
        try{

            window.location.href = `${USER_API_BASE_URL}/login`;
            setIsConnectedToSpotify(true);

        }catch (error: unknown){
            setHasError(true);
            console.error("Error logging into Spotify:", error);
        }
    }

    return (
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
    )
}

export default SpotifyConnection