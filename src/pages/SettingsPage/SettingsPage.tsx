import { Outlet } from "react-router"

function SettingsPage() {
    return (
        <div>
            <h1 data-test="title">Settings</h1>
            <Outlet />
        </div>
    )
}

export default SettingsPage