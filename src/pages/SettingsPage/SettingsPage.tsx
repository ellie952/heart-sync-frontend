import { Outlet } from "react-router"

function SettingsPage() {
    return (
        <div className="page"
            style={{
                paddingLeft:"40px",
            }}> 
                 <h1 data-test="title" className="container" style={{marginLeft:"0px"}}>Settings</h1>
                <Outlet />
            
           
        </div>
    )
}

export default SettingsPage