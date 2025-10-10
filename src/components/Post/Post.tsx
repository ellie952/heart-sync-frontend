import { useState } from "react";
import type { PostType } from "../../interfaces/PostType";

function Post({ PK, SK, pst_caption = "", pst_media = "", pst_activityType, playlist_spotifyURI, pst_timestamp }: PostType) {
    const [post] = useState({
        PK: PK,
        SK: SK,
        pst_caption: pst_caption,
        pst_media: pst_media,
        pst_activityType: pst_activityType,
        playlist_spotifyURI: playlist_spotifyURI,
        pst_timestamp: pst_timestamp
    });
    // const [isEditing, setIsEditing] = useState(false);

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