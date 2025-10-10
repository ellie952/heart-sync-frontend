import { useEffect, useState } from "react";
import type { PostType } from "../../interfaces/PostType";
import Post from "../Post/Post"
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function PostList({ userId }: { userId: string }) {
    const [postList, setPostList] = useState<PostType[]>([]);
    const [hasError, setHasError] = useState(false);

    const { token } = useAuth();

    const POST_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/posts`;

    useEffect(() => {
        async function getUserFeed() {
            setHasError(false);

            const feed: PostType[] = [];

            try {
                let response = await axios.get(`${POST_API_BASE_URL}/feed`, {
                    headers: { Authorization: `Bearer ${token}`, },
                });

                feed.push(...response.data.data || null);

                response = await axios.get(`${POST_API_BASE_URL}/post-history`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { userId },
                });

                feed.push(...response.data.data || null);

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
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    activity={post.activity}
                    description={post.description}
                />
            )) : (
                <p>No posts found!</p>
            )}
        </div>
    )
} export default PostList