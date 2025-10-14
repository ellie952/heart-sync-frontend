import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("RegisterForm component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders RegisterForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        // Act
        const registerForm = screen.getByRole("form", { name: "Register" });
        const alreadyLoggedInMessage = screen.queryByRole("paragraph");

        // Assert
        expect(registerForm).toBeInTheDocument();
        expect(alreadyLoggedInMessage).not.toBeInTheDocument();
    });

    test("Does not render EditProfileForm not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        // Act
        const registerForm = screen.queryByRole("form", { name: "Register" });
        const alreadyLoggedInMessage = screen.getByRole("paragraph");

        // Assert
        expect(registerForm).not.toBeInTheDocument();
        expect(alreadyLoggedInMessage).toBeInTheDocument();
    });
});