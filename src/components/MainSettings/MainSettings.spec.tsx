import { render, screen } from "@testing-library/react";
import MainSettings from "./MainSettings";
import { useAuth } from "../../contexts/AuthContext"
import { MemoryRouter } from "react-router";

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn()
}));

describe("MainSettings component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Renders Edit Profile, Reset Password, Delete Profile, Log Out buttons when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <MainSettings />
            </MemoryRouter>
        );

        // Act
        const editProfileButton = screen.getByRole("link", { name: "Edit Profile" });
        const resetPasswordButton = screen.getByRole("link", { name: "Reset Password" });
        const deleteProfileButton = screen.getByRole("link", { name: "Delete Profile" });
        const logOutButton = screen.getByRole("button", { name: "Log out" });

        // Assert
        expect(editProfileButton).toBeInTheDocument();
        expect(resetPasswordButton).toBeInTheDocument();
        expect(deleteProfileButton).toBeInTheDocument();
        expect(logOutButton).toBeInTheDocument();
    });

    test("Does not render Edit Profile, Reset Password, Delete Profile, Log Out buttons when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <MainSettings />
            </MemoryRouter>
        );

        // Act
        const editProfileButton = screen.queryByRole("link", { name: "Edit Profile" });
        const resetPasswordButton = screen.queryByRole("link", { name: "Reset Password" });
        const deleteProfileButton = screen.queryByRole("link", { name: "Delete Profile" });
        const logOutButton = screen.queryByRole("button", { name: "Log out" });

        // Assert
        expect(editProfileButton).not.toBeInTheDocument();
        expect(resetPasswordButton).not.toBeInTheDocument();
        expect(deleteProfileButton).not.toBeInTheDocument();
        expect(logOutButton).not.toBeInTheDocument();
    });
});