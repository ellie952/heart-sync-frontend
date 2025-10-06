import { useState, type ChangeEvent, type FormEvent } from "react";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleRetypedPassword(e: ChangeEvent<HTMLInputElement>) {
        setRetypedPassword(e.target.value)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password === retypedPassword) {
            console.log("Registered.");
        } else {
            console.log("Password fields must match.")
        }
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
            <input
                type="password"
                placeholder="Confirm password"
                value={retypedPassword}
                onChange={handleRetypedPassword}
            />
            <input type="submit" />
        </form>
    )
}

export default RegisterForm