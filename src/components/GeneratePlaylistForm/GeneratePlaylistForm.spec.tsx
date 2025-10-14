import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import GeneratePlaylistForm from "./GeneratePlaylistForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("GeneratePlaylistForm component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders GeneratePlaylistForm when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <GeneratePlaylistForm />
            </MemoryRouter>
        );

        // Act
        const generatePlaylistForm = screen.getByRole("form", { name: "Generate Playlist" });

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(generatePlaylistForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render EditProfileForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <GeneratePlaylistForm />
            </MemoryRouter>
        );

        // Act
        const generatePlaylistForm = screen.queryByRole("form", { name: "Generate Playlist" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(generatePlaylistForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});