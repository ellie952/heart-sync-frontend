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

    return (
        <div>
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
        </div>
    )
}

export default Post;