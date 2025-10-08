import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [hasError, setHasError] = useState(false)

    const USER_API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handleEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleRetypedPassword(e: ChangeEvent<HTMLInputElement>) {
        setRetypedPassword(e.target.value)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setHasError(false);

        if (password !== retypedPassword) {
            setHasError(true);
            console.log("Password fields must match.");
        } else {
            try {
                const response = await axios.post(USER_API_BASE_URL, {
                    username,
                    password,
                    email
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                console.log(`Created user ${username}.`);
                return response.data;
            } catch (error: unknown) {
                setHasError(true);
                if (axios.isAxiosError(error)) {
                    console.error("Error registering user:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
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
            {hasError && (
                <p>
                    Registration failed: All fields must be valid.
                </p>
            )}
        </form>
    )
}

export default RegisterForm