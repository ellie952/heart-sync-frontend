import { Outlet } from "react-router"

function SettingsPage() {
    return (
        <div>
            <h1>Settings</h1>
            <Outlet />
        </div>
    )
}

export default SettingsPage