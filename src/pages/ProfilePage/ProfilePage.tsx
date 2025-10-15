import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import type { UserType } from "../../interfaces/UserType";
import Post from "../../components/Post/Post";
import type { PostType } from "../../interfaces/PostType";
import { useParams } from "react-router";
import { ENVIRONMENT } from "../../constants";
import "../../css/styles.css"

function ProfilePage() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userPosts, setUserPosts] = useState<PostType[]>([]);
    const [hasError, setHasError] = useState(false);
    const [profilePicURL, setProfilePicURL] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { token, username } = useAuth();

    const { userId } = useParams();

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;
    const POST_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/posts`;

    useEffect(() => {
        async function getUserProfile() {
            setHasError(false);
            setIsLoading(true);

            if (!userId) {
                setHasError(true);
                setIsLoading(false);
                return;
            };
            // get user profile picture 
            try {
                const response = await axios.get(`${USER_API_BASE_URL}/${encodeURIComponent(userId)}/profile-pic`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const picURL = response.data.data;
                console.log(picURL);
                setProfilePicURL(picURL);

            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching user profile picture:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }

            try {
                const response = await axios.get(`${USER_API_BASE_URL}/profile/${encodeURIComponent(userId)}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const userProfileData = response.data.data;
                setUser(userProfileData);
                
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching user profile:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }

            try {
                const response = await axios.get(`${POST_API_BASE_URL}/post-history?userID=${encodeURIComponent(userId)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const userPostHistory = response.data.data;
                userPostHistory.sort((a: PostType, b: PostType) => Number(b.pst_timestamp) - Number(a.pst_timestamp));

                setUserPosts(userPostHistory);
            } catch (error: unknown) {
                setUserPosts([]);
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching user profile:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }

            setIsLoading(false);
        }

        getUserProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFollowing])

    async function handleCopyProfileLink() {
        if (!userId) {
            setHasError(true);
            return;
        };

        await navigator.clipboard.writeText(`http://localhost:5173/profile/${encodeURIComponent(userId)}`)
    }

    async function handleFollow() {
        if (!user) return;

        try {
            await axios.put(
                `${USER_API_BASE_URL}/following`,
                { followingUsername: user.username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setIsFollowing(true);
        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error following user:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <div className="page">
            {user !== null && !hasError ? (
                <>
                    <h1>{user.username}</h1>
                    <p>Email: {user.email}</p>

                    {profilePicURL ? (
                        <img width={"200px"} height={"200px"} style={{borderRadius:"50%"}}
                            src={profilePicURL}
                            // alt={`${user.username}'s profile picture`}
                            onError={() => {
                                console.error('Error loading profile picture');
                            }}
                        />
                    ) : (
                        <div>
                            No Profile Image
                        </div>
                    )}
                    <br></br>
                    {username !== user.username ? (
                        <button onClick={handleFollow}>
                            Follow
                        </button>
                    ) : (
                        <button onClick={handleCopyProfileLink} style={{margin:"20px"}}>
                            Copy Profile Link
                        </button>
                    )}
                    {userPosts.length !== 0 ? (
                        userPosts.map((post) => (
                            <Post
                                key={post.SK}
                                PK={post.PK}
                                SK={post.SK}
                                pst_caption={post.pst_caption}
                                pst_activityType={post.pst_activityType}
                                pst_media={post.pst_media}
                                pst_timestamp={post.pst_timestamp}
                                playlist_spotifyURI={post.playlist_spotifyURI}
                            />
                        ))
                    ) : (
                        <p>No posts found!</p>
                    )}
                </>
            ) : isLoading ? (
                 <div style={{wordSpacing:"20px"}}className="spinner-border" role="status">
                            <span className="visually-hidden" role="status">Loading Profile...</span>
                 </div>
            ) : (
                <h1>User not found!</h1>
            )}
        </div >
    )
}

export default ProfilePage