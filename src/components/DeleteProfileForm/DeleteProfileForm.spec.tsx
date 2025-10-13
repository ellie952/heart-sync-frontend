import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DeleteProfileForm from "./DeleteProfileForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("DeleteProfileForm component", () => {
    test("Renders DeleteProfileForm when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <DeleteProfileForm />
            </MemoryRouter>
        );

        // Act
        const deleteProfileForm = screen.getByRole("form", { name: "Delete Profile" });

        // Assert
        expect(deleteProfileForm).toBeInTheDocument();
    })
});