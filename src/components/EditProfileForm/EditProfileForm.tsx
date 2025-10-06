import { useState, type ChangeEvent, type FormEvent } from "react";

function EditProfileForm() {
    const [username, setUsername] = useState("");

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Profile updated");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
                required
            />
            <input type="submit" />
        </form>
    )
}

export default EditProfileForm;