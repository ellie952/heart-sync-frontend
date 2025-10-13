import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import EditProfileForm from "./EditProfileForm";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

describe("EditProfileForm component", () => {
    test("Renders EditProfileForm when logged in", () => {
        // Arrange
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