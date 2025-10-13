import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("EditProfileForm component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders EditProfileForm when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <EditProfileForm />
            </MemoryRouter>
        );

        // Act
        const editProfileForm = screen.getByRole("form", { name: "Edit Profile" });

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(editProfileForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render EditProfileForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <EditProfileForm />
            </MemoryRouter>
        );

        // Act
        const editProfileForm = screen.queryByRole("form", { name: "Edit Profile" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(editProfileForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});