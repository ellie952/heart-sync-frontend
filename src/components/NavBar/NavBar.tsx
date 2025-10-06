function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">HeartSync</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">
                                Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new-playlist">
                                New Post
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings">
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar