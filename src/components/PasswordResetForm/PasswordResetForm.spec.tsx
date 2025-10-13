import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PasswordResetForm from "./PasswordResetForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("PasswordResetForm component", () => {
    test("Renders PasswordResetForm when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <PasswordResetForm />
            </MemoryRouter>
        );

        // Act
        const passwordResetForm = screen.getByRole("form", { name: "Password Reset" });

        // Assert
        expect(passwordResetForm).toBeInTheDocument();
    })
});