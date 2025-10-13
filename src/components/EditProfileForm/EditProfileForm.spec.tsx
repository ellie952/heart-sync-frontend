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

        // Assert
        expect(editProfileForm).toBeInTheDocument();
    })
});