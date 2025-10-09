import { useState, type ChangeEvent, type FormEvent } from "react";
import type { PostType } from "../../interfaces/PostType";

function Post({ id, title, activity, description }: PostType) {
    const [post, setPost] = useState({
        id: id,
        title: title,
        activity: activity,
        description: description
    });
    const [isEditing, setIsEditing] = useState(false);

    function handleTitle(e: ChangeEvent<HTMLInputElement>) {
        setPost({ ...post, title: e.target.value });
    }

    function handleActivity(e: ChangeEvent<HTMLInputElement>) {
        setPost({ ...post, activity: e.target.value });
    }

    function handleDescription(e: ChangeEvent<HTMLInputElement>) {
        setPost({ ...post, description: e.target.value });
    }

    function handleEditButton() {
        setIsEditing(true);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing ? (
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
                <>
                    <h3>
                        {title}: <span>{activity}</span>
                    </h3>
                    <p>
                        {description}
                    </p>
                    <button onClick={handleEditButton}>
                        Edit
                    </button>
                </>
            )}
        </div>
    )
}

export default Post;