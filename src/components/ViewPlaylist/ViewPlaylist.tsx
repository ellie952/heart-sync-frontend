import axios from "axios";
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router";

// view the generated playlist and export to spotify if you want to 

interface ViewPlaylistProps {
    playlistId: string;
}

function ViewPlaylist({ playlistId }: ViewPlaylistProps) {
    const[isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [playlistData, setPlaylistData] = useState<any>(null);
    const [spotifyPlaylistURL, setSpotifyPlaylistURL] = useState("");

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/playlist-builder`; 
    
    useEffect(()=>{

        const token = localStorage.getItem("TOKEN");

        if (!token){
            console.log("no token");
            setHasError(true);
            setIsLoading(false);
            return;
        }
        
        if(!playlistId){
            console.log("no playlist id");
            setHasError(true);
            setIsLoading(false);
            return;
        }

        const getPlaylistData = async() =>{
             try{

                const response = await axios.get(`${USER_API_BASE_URL}/${playlistId}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Full response:", response);
                console.log("Response data:", response.data);

                // Check if response data exists and has the expected structure
                if (!response.data) {
                    throw new Error("No data received from Playlist Builder");
                }

                setPlaylistData(response.data);

            } catch (error: unknown){
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error getting playlist data :", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally{
                setIsLoading(false);
            }
        };

        const getSpotifyPlaylistURL = async() => {
            try{

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/spotify/playlists/${playlistId}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Full response:", response);
                console.log("Response data:", response.data);
                console.log("potify Playlist URL:", response.data.external_urls.spotify);

                // Check if response data exists and has the expected structure
                if (!response.data) {
                    throw new Error("No data received from Spotify");
                }

                setSpotifyPlaylistURL(response.data.external_urls.spotify);

            } catch (error: unknown){
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error getting playlist data from Spotify:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally{
                setIsLoading(false);
            }

        };

        getPlaylistData();
        getSpotifyPlaylistURL();

    }, [playlistId]);

    return (
        <div>
            {isLoading && <p>Loading playlist...</p>}
            
            {hasError && (
                <p style={{color: 'red'}}>
                    Error loading playlist. Please try again.
                </p>
            )}
            
            {!isLoading && !hasError && playlistData && (
                <div>
                    <h2>Playlist Data</h2>
                    <a href={spotifyPlaylistURL}>Spotify Playlist Link</a>
                    <pre>
                        {JSON.stringify(playlistData, null, 2)}
                    </pre>
                </div>
            )}
            
            {!isLoading && !hasError && !playlistData && (
                <p>No playlist data available.</p>
            )}
        </div>
    )
            

}

export default ViewPlaylist