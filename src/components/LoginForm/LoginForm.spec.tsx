import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("LoginForm component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders LoginForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        // Act
        const loginForm = screen.getByRole("form", { name: "Login" });
        const alreadyLoggedInMessage = screen.queryByRole("paragraph");

        // Assert
        expect(loginForm).toBeInTheDocument();
        expect(alreadyLoggedInMessage).not.toBeInTheDocument();
    });

    test("Does not render EditProfileForm not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        // Act
        const loginForm = screen.queryByRole("form", { name: "Login" });
        const alreadyLoggedInMessage = screen.getByRole("paragraph");

        // Assert
        expect(loginForm).not.toBeInTheDocument();
        expect(alreadyLoggedInMessage).toBeInTheDocument();
    });
});