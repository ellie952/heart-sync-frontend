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
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(passwordResetForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render PasswordResetForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <PasswordResetForm />
            </MemoryRouter>
        );

        // Act
        const passwordResetForm = screen.queryByRole("form", { name: "Password Reset" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(passwordResetForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});