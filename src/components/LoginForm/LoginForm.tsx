import { useState, type ChangeEvent, type FormEvent } from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Password fields must match.")

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
            />
            <input type="submit" />
        </form>
    )
}

export default LoginForm