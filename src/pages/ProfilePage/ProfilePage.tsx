import { useEffect, useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import type { UserType } from "../../interfaces/UserType";
// import Post from "../../components/Post/Post";
// import type { PostType } from "../../interfaces/PostType";
import { useParams } from "react-router";

function ProfilePage() {
    const [user, setUser] = useState<UserType | null>(null);
    // const [userPosts, setUserPosts] = useState<PostType[]>([]);
    const [hasError, setHasError] = useState(false);

    const { userId } = useParams();
    console.log(userId);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;
    // const POST_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/posts`;

    useEffect(() => {
        async function getUserProfile() {
            setHasError(false);

            try {
                if (!userId) return;
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

            // try {
            //     const response = await axios.get(`${POST_API_BASE_URL}/post-history`, {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //             "Content-Type": "application/json"
            //         }
            //     });

            //     const userPostHistory = response.data.data;
            //     setUserPosts(userPostHistory);
            // } catch (error: unknown) {
            //     setUserPosts([]);
            //     if (axios.isAxiosError(error)) {
            //         console.error("Error fetching user profile:", error.response?.data || error.message);
            //     } else {
            //         console.error("Unexpected error:", error);
            //     }
            // }
        }

        getUserProfile();
    }, [])

    return (
        <div>
            {user !== null && !hasError ? (
                <>
                    <h1>{user.username}</h1>
                    <p>Email: {user.email}</p>
                    {/* {userPosts.length !== 0 ? (
                        userPosts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                activity={post.activity}
                                description={post.description}
                            />
                        ))
                    ) : (
                        <p>No posts found!</p>
                    )} */}
                </>
            ) : (
                <h1>User not found!</h1>
            )}
        </div >
    )
}

export default ProfilePage