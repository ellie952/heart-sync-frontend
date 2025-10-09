import axios from "axios"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router";

function NewPostForm() {
    const [newPost, setNewPost] = useState({
        id: "",
        postedBy: localStorage.getItem("USERNAME"),
        title: "",
        activity: "",
        description: "",
        playlistURL: ""
    });
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`; 

    function handleNewTitle(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, title: e.target.value });
    }

    function handleNewActivity(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, activity: e.target.value });
    }

    function handleNewDescription(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, description: e.target.value });
    }

    function handleNewPlaylistURL(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, playlistURL: e.target.value});
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        newPost.id = crypto.randomUUID();

        const token = localStorage.getItem("TOKEN");

        if (token){
            try {
            
                await axios.post(`${USER_API_BASE_URL}/posts`, {
                    newPost
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                navigate("/dashboard")
                
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error creating post", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        } else {
            console.log("Not authorized to create post.");
        }
       
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={handleNewTitle}
            />
            <input
                type="text"
                placeholder="Activity"
                value={newPost.activity}
                onChange={handleNewActivity}
            />
            <input
                type="text"
                placeholder="Description"
                value={newPost.description}
                onChange={handleNewDescription}
            />
            <input
                type="url"
                placeholder="Spotify Playlist URL"
                value = {newPost.playlistURL}
                onChange={handleNewPlaylistURL}
            />
            <input type="submit" />
            {hasError && (
                <p>
                    Failed to create post.
                </p>
            )}
        </form>
    )
}

export default NewPostForm;

