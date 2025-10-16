import axios from "axios";
import { useState, useEffect } from "react";
import { ENVIRONMENT } from "../../constants";
import type { PlaylistType } from "../../interfaces/PlaylistType";


interface ViewPlaylistProps {
    playlistId: string;
}

function ViewPlaylist({ playlistId }: ViewPlaylistProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [playlistData, setPlaylistData] = useState<PlaylistType | null>(null);
    const [spotifyPlaylistURL, setSpotifyPlaylistURL] = useState("");
    const [playlistName, setPlaylistName] = useState("");

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/playlist-builder`;

    useEffect(() => {

        const token = localStorage.getItem("TOKEN");

        if (!token) {
            console.log("no token");
            setHasError(true);
            setIsLoading(false);
            return;
        }

        if (!playlistId) {
            console.log("no playlist id");
            setHasError(true);
            setIsLoading(false);
            return;
        }

        const getPlaylistData = async () => {
            try {

                const response = await axios.get(`${USER_API_BASE_URL}/${playlistId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Full response:", response);
                console.log("Response data:", response.data);

                // Check if response data exists and has the expected structure
                if (!response.data) {
                    throw new Error("No data received from Playlist Builder");
                }

                setPlaylistData(response.data.data);
                setPlaylistName(response.data.data.playlistName);

            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error getting playlist data :", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        const getSpotifyPlaylistURL = async () => {
            try {

                const response = await axios.get(`${ENVIRONMENT.VITE_API_BASE_URL}/spotify/playlists/${playlistId}`, {
                    headers: {
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

            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error getting playlist data from Spotify:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally {
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
                <p style={{ color: 'red' }}>
                    Error loading playlist. Please try again.
                </p>
            )}

            {!isLoading && !hasError && playlistData && (
                <div className="container">
                    <h2 className="sibling-element">{playlistName}</h2>
                    <button type="button" className="btn btn-Link sibling-element" style={{marginLeft:"650px", backgroundColor:"green"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-spotify" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                        </svg>
                        <a href={spotifyPlaylistURL} style={{color:"white"}}>Listen on Spotify</a>
                    </button>

                    <table id="playlist-data" className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Album</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlistData && playlistData.tracksInfo && playlistData.tracksInfo.map((track, index) => (
                                <tr key={index}>
                                    <td>{track.Title}</td>
                                    <td>{track.Artist}</td>
                                    <td>{track.Album}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isLoading && !hasError && !playlistData && (
                <p>No playlist data available.</p>
            )}
        </div>
    )


}

export default ViewPlaylist