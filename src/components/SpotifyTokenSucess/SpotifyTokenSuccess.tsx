import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ENVIRONMENT } from "../../constants";

function SpotifyTokenSuccess() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/spotify`;

    useEffect(() => {
        const accessToken = params.get("accessToken");

        if (!accessToken) {
            console.log("no access token");
            setHasError(true);
            setIsLoading(false);
            return;
        }

        localStorage.setItem("SPOTIFY-TOKEN", accessToken);

        // call to get spotify user 
        const getSpotifyUser = async () => {
            try {
                const response = await axios.get(`${USER_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                console.log("Full response:", response);
                console.log("Response data:", response.data);

                // Check if response data exists and has the expected structure
                if (!response.data) {
                    throw new Error("No data received from Spotify API");
                }

                if (!response.data?.id) {
                    console.error("Response data structure:", response.data);
                    throw new Error("User ID not found in Spotify response");
                }

                const userId = response.data.id;
                localStorage.setItem("SPOTIFY-USER-ID", userId);

                navigate("/generate-playlist");

            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error getting Spotify user data :", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getSpotifyUser();

    }, [params, navigate, USER_API_BASE_URL]);

    if (isLoading) {
        return (
            <p>Connecting to Spotify ... </p>
        );
    }
    if (hasError) {
        return (
            <p style={{ color: "red" }}>Failed to connect to spotify</p>
        )
    }

    return null;
}

export default SpotifyTokenSuccess;

