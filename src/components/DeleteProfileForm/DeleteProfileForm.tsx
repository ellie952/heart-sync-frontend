import { useState, type ChangeEvent, type FormEvent } from "react"

function DeleteProfileForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Account deleted.")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Confirm username"
                value={username}
                onChange={handleUsername}
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={password}
                onChange={handlePassword}
            />
            <input type="submit" value="Delete My Profile" />
        </form>
    )
}

export default DeleteProfileForm