import { useEffect, useState } from "react";
import type { PostType } from "../../interfaces/PostType";
import axios from "axios";

function Post({ PK, SK, pst_caption = "None", pst_media = "Empty", pst_activityType, playlist_spotifyURI, pst_timestamp }: PostType) {
    const [post] = useState({
        PK: PK,
        SK: SK,
        pst_caption: pst_caption,
        pst_media: pst_media,
        pst_activityType: pst_activityType,
        playlist_spotifyURI: playlist_spotifyURI,
        pst_timestamp: pst_timestamp
    });
    const [postAuthor, setPostAuthor] = useState<string>("");
    // const [isEditing, setIsEditing] = useState(false);

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    useEffect(() => {
        async function getPostAuthor() {
            const response = await axios.get(`${USER_API_BASE_URL}/profile/${encodeURIComponent(PK)}`);

            const fetchedUser = response.data.data;
            setPostAuthor(fetchedUser.username);
        }

        getPostAuthor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PK]);

    // function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    //     setPost({ ...post, title: e.target.value });
    // }

    // function handleActivity(e: ChangeEvent<HTMLInputElement>) {
    //     setPost({ ...post, activity: e.target.value });
    // }

    // function handleDescription(e: ChangeEvent<HTMLInputElement>) {
    //     setPost({ ...post, description: e.target.value });
    // }

    // function handleEditButton() {
    //     setIsEditing(true);
    // }

    // function handleSubmit(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setIsEditing(false);
    // }

    return (
        <div>
            {/* {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={post.title}
                        onChange={handleTitle}
                    />
                    <input
                        type="text"
                        placeholder="Activity"
                        value={post.activity}
                        onChange={handleActivity}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={post.description}
                        onChange={handleDescription}
                    />
                    <input type="submit" />
                </form>
            ) : (
                <> */}
            <h3>
                {post.pst_activityType}
            </h3>
            <p>
                By: {postAuthor}
            </p>
            <p>
                Caption: {post.pst_caption}
            </p>
            <a href={post.playlist_spotifyURI}>
                Playlist link
            </a>
            <p>
                {new Date(post.pst_timestamp).toString()}
            </p>
            {/* <button onClick={handleEditButton}>
                Edit
            </button>
            </>
            )} */}
        </div>
    )
}

export default Post;