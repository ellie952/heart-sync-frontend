import { useState, type ChangeEvent, type FormEvent } from "react";

// TODO: connect this to backend- does this create a new post in the backend database? 
function NewPost() {
    const [title, setTitle] = useState("");
    const [activity, setActivity] = useState("");
    const [caption, setCaption] = useState("");
    const [spotifyURL, setSpotifyURL] = useState("");

    function handleTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleActivity(e: ChangeEvent<HTMLInputElement>) {
        setActivity(e.target.value);
    }

    function handleCaption(e: ChangeEvent<HTMLInputElement>) {
        setCaption(e.target.value);
    }

    function handleSpotifyURL(e: ChangeEvent<HTMLInputElement>) {
        setSpotifyURL(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("New post created.");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                 <input
                        type="text"
                        placeholder="Title"
                        value = {title}
                        onChange={handleTitle}

                    />
                    <input
                        type="text"
                        placeholder="Caption"
                        value = {caption}
                        onChange={handleCaption}
                    />
                   <input
                        type="text"
                        placeholder="Activty Type"
                        value = {activity}
                        onChange={handleActivity}
                    />
                    <input
                        type="url"
                        placeholder="Spotify Playlist URL"
                         value = {spotifyURL}
                        onChange={handleSpotifyURL}
                    />
                    <button type="submit">
                        Create Post
                    </button>
                  
                    {/* <button className="activity type" type="button" data-bs-toggle="dropdown">
                        Activity Type
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Run</a></li>
                        <li><a className="dropdown-item" href="#">Hike</a></li>
                        <li><a className="dropdown-item" href="#">Walk</a></li>
                    </ul> */}
                   
            </form>
        </div>
    )
       
}

export default NewPost;