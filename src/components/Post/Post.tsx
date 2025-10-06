import { useState, type ChangeEvent, type FormEvent } from "react";

function Post() {
    const [title, setTitle] = useState("Sample Post");
    const [activity, setActivity] = useState("Run");
    const [description, setDescription] = useState("This is a sample post.");
    const [isEditing, setIsEditing] = useState(false);

    function handleTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleActivity(e: ChangeEvent<HTMLInputElement>) {
        setActivity(e.target.value);
    }

    function handleDescription(e: ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
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
                        value={title}
                        onChange={handleTitle}
                    />
                    <input
                        type="text"
                        placeholder="Activity"
                        value={activity}
                        onChange={handleActivity}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescription}
                    />
                    <input type="submit" />
                </form>
            ) : (
                <>
                    <h3>
                        {title}: <span>{activity}</span>
                    </h3>
                    <p>{description}</p>
                    <button onClick={handleEditButton}>Edit</button>
                </>
            )}
        </div>
    )
}

export default Post;