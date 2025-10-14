import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NewPostForm from "./NewPostForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../constants", () => ({
    ENVIRONMENT: { VITE_API_BASE_URL: "URL" },
}));

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("NewPostForm component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Renders NewPostForm when logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: "TOKEN" });

        render(
            <MemoryRouter>
                <NewPostForm />
            </MemoryRouter>
        );

        // Act
        const newPostForm = screen.getByRole("form", { name: "New Post" });

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(newPostForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render NewPostForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <NewPostForm />
            </MemoryRouter>
        );

        // Act
        const newPostForm = screen.queryByRole("form", { name: "Edit Profile" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(newPostForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});