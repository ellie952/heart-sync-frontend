import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SpotifyConnection from "./SpotifyConnection";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("SpotifyConnection component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders SpotifyConnection when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <SpotifyConnection />
            </MemoryRouter>
        );

        // Act
        const spotifyConnectionForm = screen.getByRole("button", { name: "Connect to Spotify" });

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(spotifyConnectionForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render SpotifyConnection when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <SpotifyConnection />
            </MemoryRouter>
        );

        // Act
        const spotifyConnectionForm = screen.queryByRole("button", { name: "Connect to Spotify" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(spotifyConnectionForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});