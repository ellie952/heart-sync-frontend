import { useState, type ChangeEvent, type FormEvent } from "react";

function PasswordResetForm() {
    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if ((newPassword === confirmedPassword) && (newPassword !== prevPassword)) {
            console.log("Password reset successfully.");
        } else {
            console.error("Password reset failed.");
        }
    }

    function handlePrevPassword(e: ChangeEvent<HTMLInputElement>) {
        setPrevPassword(e.target.value);
    }

    function handleNewPassword(e: ChangeEvent<HTMLInputElement>) {
        setNewPassword(e.target.value);
    }

    function handleConfirmedPassword(e: ChangeEvent<HTMLInputElement>) {
        setConfirmedPassword(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="Old password"
                value={prevPassword}
                onChange={handlePrevPassword}
                required
            />
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={handleNewPassword}
                required
            />
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmedPassword}
                onChange={handleConfirmedPassword}
                required
            />
            <input type="submit" />
        </form>
    )
}

export default PasswordResetForm;