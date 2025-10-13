import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
    jwtDecode: jest.fn(),
}));

describe("NavBar Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders Brand, Login, and Register links when logged out", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });
        render(<NavBar />);


        // Act
        const brandLink = screen.getByRole("link", { name: "HeartSync" });
        const loginLink = screen.getByRole("link", { name: "Login" });
        const registerLink = screen.getByRole("link", { name: "Register" });

        const dashboardLink = screen.queryByRole("link", { name: "Dashboard" });
        const profileLink = screen.queryByRole("link", { name: "Profile" });
        const generatePlaylistLink = screen.queryByRole("link", { name: "Generate Playlist" });
        const newPostLink = screen.queryByRole("link", { name: "New Post" });
        const spotifyConnectionLink = screen.queryByRole("link", { name: "Spotify Connection" });
        const settingsLink = screen.queryByRole("link", { name: "Settings" });

        // Assert
        expect(brandLink).toHaveAttribute("href", "/");
        expect(loginLink).toHaveAttribute("href", "/login");
        expect(registerLink).toHaveAttribute("href", "/register");

        expect(dashboardLink).not.toBeInTheDocument();
        expect(profileLink).not.toBeInTheDocument();
        expect(generatePlaylistLink).not.toBeInTheDocument();
        expect(newPostLink).not.toBeInTheDocument();
        expect(spotifyConnectionLink).not.toBeInTheDocument();
        expect(settingsLink).not.toBeInTheDocument();
    });

    test("Renders other links when logged in", () => {
        // Arrange
        const mockToken = "TOKEN";
        const mockUserId = "USER";
        (useAuth as jest.Mock).mockReturnValue({ token: mockToken });
        (jwtDecode as jest.Mock).mockReturnValue({ id: mockUserId });

        render(<NavBar />);

        // Act
        const brandLink = screen.getByRole("link", { name: "HeartSync" });
        const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
        const profileLink = screen.getByRole("link", { name: "Profile" });
        const generatePlaylistLink = screen.getByRole("link", { name: "Generate Playlist" });
        const newPostLink = screen.getByRole("link", { name: "New Post" });
        const spotifyConnectionLink = screen.getByRole("link", { name: "Spotify Connection" });
        const settingsLink = screen.getByRole("link", { name: "Settings" });

        const loginLink = screen.queryByRole("link", { name: "Login" });
        const registerLink = screen.queryByRole("link", { name: "Register" });

        // Assert
        expect(brandLink).toHaveAttribute("href", "/");
        expect(dashboardLink).toHaveAttribute("href", `/dashboard/${mockUserId}`);
        expect(profileLink).toHaveAttribute("href", `/profile/${mockUserId}`);
        expect(generatePlaylistLink).toHaveAttribute("href", "/generate-playlist");
        expect(newPostLink).toHaveAttribute("href", "/new-post");
        expect(spotifyConnectionLink).toHaveAttribute("href", "/spotify-connection");
        expect(settingsLink).toHaveAttribute("href", "/settings");

        expect(loginLink).not.toBeInTheDocument();
        expect(registerLink).not.toBeInTheDocument();
    });
});