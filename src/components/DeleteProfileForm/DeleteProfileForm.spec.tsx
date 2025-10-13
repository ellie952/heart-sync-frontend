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
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

        const redirectMessage = screen.queryByRole("paragraph");
        const redirectLink = screen.queryByRole("link", { name: "log in" });

        // Assert
        expect(deleteProfileForm).toBeInTheDocument();

        expect(redirectMessage).not.toBeInTheDocument();
        expect(redirectLink).not.toBeInTheDocument();
    });

    test("Does not render DeleteProfileForm when not logged in", () => {
        // Arrange
        (useAuth as jest.Mock).mockReturnValue({ token: null });

        render(
            <MemoryRouter>
                <DeleteProfileForm />
            </MemoryRouter>
        );

        // Act
        const deleteProfileForm = screen.queryByRole("form", { name: "Delete Profile" });

        const redirectMessage = screen.getByRole("paragraph");
        const redirectLink = screen.getByRole("link", { name: "log in" });

        // Assert
        expect(deleteProfileForm).not.toBeInTheDocument();

        expect(redirectMessage).toBeInTheDocument();
        expect(redirectLink).toBeInTheDocument();
    });
});