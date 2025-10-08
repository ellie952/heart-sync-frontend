import { useState } from "react";
import { posts } from "../../data/posts";
import type { PostType } from "../../interfaces/PostType";
import Post from "../Post/Post"

function PostList() {
    const [postList, setPostList] = useState(posts);

    function updatePosts(updatedPost: PostType) {
        setPostList((): PostType[] => {
            const newPostList = [];

            for (let i = 0; i < postList.length; i++) {
                if (postList[i].id === updatedPost.id) {
                    newPostList.push(updatedPost)
                } else {
                    newPostList.push(postList[i]);
                }
            }

            return newPostList;
        })
    }

    return (
        <div>
            {postList.map((post: PostType) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    activity={post.activity}
                    description={post.description}
                    updatePosts={updatePosts}
                />
            ))}
        </div>
    )
} export default PostList