import { render } from "@testing-library/react";
import NavBar from "./NavBar";

jest.mock("../../contexts/AuthContext", () => ({
    useAuth: () => ({ username: null, token: null, login: null, logout: null }),
}));

test("Renders initial NavBar", () => {
    const { getByText } = render(<NavBar />);

    const appNameElement = getByText("HeartSync");
    const loginLinkElement = getByText("Login");
    const registerLinkElement = getByText("Register");

    expect(appNameElement).toBeInTheDocument();
    expect(loginLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toBeInTheDocument();
});