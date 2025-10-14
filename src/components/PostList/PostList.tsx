import { useEffect, useState } from "react";
import type { PostType } from "../../interfaces/PostType";
import Post from "../Post/Post"
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { ENVIRONMENT } from "../../constants";

function PostList({ userId }: { userId: string }) {
    const [postList, setPostList] = useState<PostType[]>([]);
    const [hasError, setHasError] = useState(false);

    const { token } = useAuth();

    const POST_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/posts`;

    useEffect(() => {
        async function getUserFeed() {
            setHasError(false);

            const feed: PostType[] = [];

            try {
                let response = await axios.get(`${POST_API_BASE_URL}/feed`, {
                    headers: { Authorization: `Bearer ${token}`, },
                });

                feed.push(...response.data.data || null);

                response = await axios.get(`${POST_API_BASE_URL}/post-history?userID=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                feed.push(...response.data.data || null);

                feed.sort((a: PostType, b: PostType) => Number(b.pst_timestamp) - Number(a.pst_timestamp));

                setPostList(feed);
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching user feed:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        }

        getUserFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, token])

    return (
        <div>
            {!hasError || postList.length === 0 ? postList.map((post: PostType) => (
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
            )) : (
                <p>No posts found!</p>
            )}
        </div>
    )
} export default PostList