import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ENVIRONMENT } from "../../constants";
import axios from "axios";


function SearchUsername() {
    // const [followUsername, setFollowUsername] = useState("");
    // const [followId, setFollowId] = useState("");
    //const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") as string;

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

    useEffect(() => {
        if (!query.trim()) return;

        async function getProfileByUsername() {
            try {
                const response = await axios.get(`${USER_API_BASE_URL}/profile/username/${query}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                const followId = response.data.data.PK;

                if (followId) {
                    navigate(`/profile/${encodeURIComponent(followId)}`)
                } else {
                    console.error("Unable to get user id", response.data);
                }


            } catch (error: unknown) {
                //setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching user profile:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        }

        getProfileByUsername();

    }, [query, navigate, USER_API_BASE_URL])

    return null;

}

export default SearchUsername;