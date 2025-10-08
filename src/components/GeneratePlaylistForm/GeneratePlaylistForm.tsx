// Generate Playlist 

import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router";

function GeneratePlaylistForm(){
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const { userID } = useParams();

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
        
        if (token && userID){
            // call spotify create playlist endpoint first
            // call playlistBuilder endpoint 
            const emptyPlaylist = await axios.post(`${USER_API_BASE_URL}/spotify/playlists/${userID}`)

            const populatedPlaylist = await axios.post(`${USER_API_BASE_URL}/playlist-builder?playlistId=${emptyPlaylist.data.PK}&genre=${genre}&artist=${artist}`)


            
        } else {

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
            <input type="submit" />
            {hasError && (
                <p>
                    Need to input at least one.
                </p>
            )}
        </form>
    )
    
}

export default GeneratePlaylistForm;