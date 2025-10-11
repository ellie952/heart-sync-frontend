import axios from "axios"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import type { JwtPayloadType } from "../../interfaces/JwtPayloadType";

function NewPostForm() {
    const { token } = useAuth();

    const [pst_activityType, setActivityType] = useState("");
    const [playlist_spotifyURI, setSpotifyURI] = useState("");
    const [pst_caption, setCaption] = useState("");

    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

    function handleNewActivity(e: ChangeEvent<HTMLInputElement>) {
        setActivityType(e.target.value);
    }

    function handleNewCaption(e: ChangeEvent<HTMLInputElement>) {
        setCaption(e.target.value);
    }

    function handleNewPlaylistURL(e: ChangeEvent<HTMLInputElement>) {
        setSpotifyURI(e.target.value);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!token) {
            console.log("Not authorized to create post.");
            return;
        }

        const decodedToken = jwtDecode<JwtPayloadType>(token);
        const userId = decodedToken.id;

        try {

            await axios.post(`${USER_API_BASE_URL}/posts`, {
                pst_caption, pst_activityType, playlist_spotifyURI
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            navigate(`/dashboard/${encodeURIComponent(userId)}`)

        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error creating post", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Activity"
                value={pst_activityType}
                onChange={handleNewActivity}
            />
            <input
                type="text"
                placeholder="Caption"
                value={pst_caption}
                onChange={handleNewCaption}
            />
            <input
                required
                type="url"
                placeholder="Spotify Playlist URL"
                value={playlist_spotifyURI}
                onChange={handleNewPlaylistURL}
            />
            <input type="submit" />
            {hasError && (
                <p>
                    Failed to create post.
                </p>
            )}
        </form>
    )
}

export default NewPostForm;

