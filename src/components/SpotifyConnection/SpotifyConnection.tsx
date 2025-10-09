import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
// TODO: need axios call to login to spotify, save spotify access token to local storage, then use it in already implemented axios call to user to get user id and save this to local storage
function SpotifyConnection(){
    const [isConnectedToSpotify, setIsConnectedToSpotify] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/spotify`; 

    async function handleSpotifyConnection(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        setHasError(false);

        const token = localStorage.getItem("TOKEN") //not the correct token, need the token ffrom spotify api call

        try{
            const response = await axios.get(`${USER_API_BASE_URL}/user`, {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            } )

            console.log("Full response:", response);
            console.log("Response data:", response.data);

            // Check if response data exists and has the expected structure
            if (!response.data) {
                throw new Error("No data received from Spotify API");
            }

            if (!response.data.id) {
                console.error("Response data structure:", response.data);
                throw new Error("User ID not found in Spotify response");
            }

            const userId = response.data.id;
            localStorage.setItem("USERID", userId);

            setIsConnectedToSpotify(true);
            navigate("/generate-playlist");
            
        } catch (error: unknown){
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error registering user:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <div>
            <button onClick={handleSpotifyConnection}>
                Connect to Spotify
            </button>
            {!hasError && isConnectedToSpotify && (
                <p style={{color: 'green'}}>
                    Successfully connected to Spotify!
                </p>
            )}
            {hasError && (
                <p style={{color: 'red'}}>
                    Error connecting to Spotify. Please try again.
                </p>
            )}
        </div>
    )
}

export default SpotifyConnection