import { useState, type ChangeEvent, type FormEvent } from "react"

function NewPostForm() {
    const [newPost, setNewPost] = useState({
        id: "",
        title: "",
        activity: "",
        description: ""
    });

    function handleNewTitle(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, title: e.target.value });
    }

    function handleNewActivity(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, activity: e.target.value });
    }

    function handleNewDescription(e: ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, description: e.target.value });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        newPost.id = crypto.randomUUID();
        console.log(`New post added: ${JSON.stringify(newPost)}`);
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
            <input type="submit" />
        </form>
    )
}

export default NewPostForm;