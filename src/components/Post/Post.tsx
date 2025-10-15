import { useEffect, useState } from "react";
import type { PostType } from "../../interfaces/PostType";
import axios from "axios";
import { ENVIRONMENT } from "../../constants";

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

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

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
        <div className="card" style={{width: "40rem", margin:"20px"}}>
            <div className="card-body">
                <h6>@{postAuthor}</h6>
                <h3 className="card-title">{post.pst_activityType}</h3>
                <p className="card-text">{post.pst_caption}</p>
                <a href={post.playlist_spotifyURI}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                    </svg> 
                    Checkout what I listened to!
                </a>
                <p style={{marginTop:"20px", marginBottom:"1px", color:"#0b0b0b75"}}>
                    {new Date(post.pst_timestamp).toString()}
                </p>
            </div>
        </div>
    )
}

export default Post;