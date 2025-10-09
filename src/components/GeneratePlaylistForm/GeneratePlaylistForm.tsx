// Generate Playlist 

import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router";

function GeneratePlaylistForm(){
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/playlist-builder`; 

    function handleArtist(e: ChangeEvent<HTMLInputElement>){
        setArtist(e.target.value);
    }

    function handleGenre(e: ChangeEvent<HTMLInputElement>){
        setGenre(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        setHasError(false);

        const token = localStorage.getItem("TOKEN");
        const userId = localStorage.getItem("USERID");
        
        // get spotify user 
        if (!token) {
            console.log("Login token is not working.")
            setHasError(true);
            return;
        }

        if (!userId) {
            console.log(userId)
            console.log("User id invalid.")
            setHasError(true);
            return;
        }

        if (!genre && !artist) {
            console.log("Must include a genre or an artist. Cannot leave fields empty.")
            setHasError(true);
            return;
        }

        try {
           // create playlist call 
            const emptyPlaylist = await axios.post(`${USER_API_BASE_URL}/spotify/playlists/${userId}`, {
                genre, 
                artist, 
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Empty playlist created:", emptyPlaylist.data);

            // populate playlist call
            const populatedPlaylist = await axios.post(`${USER_API_BASE_URL}/playlist-builder`, {
                playlistId: emptyPlaylist.data.PK,
                genre,
                artist
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Playlist:", populatedPlaylist.data);
            
            // 
            
        } catch (error) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("API Error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
         <form onSubmit={handleSubmit}>
            <input
                title="Genre"
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={handleGenre}
            />
            <br></br>
            <input
                title="Artist"
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={handleArtist}
            />
            <br></br>
            <input type="submit" value="Generate Playlist" />
            {hasError && (
                <p style={{color: 'red'}}>
                    Error: Please provide at least a genre or artist, and make sure you've connected to Spotify.
                </p>
            )}
        </form>
    )
    
}

export default GeneratePlaylistForm;