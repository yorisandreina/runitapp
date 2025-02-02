import { render, fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "../screens/Login";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({}),
}));

describe("Login Component", () => {
  it("renders input fields and buttons", () => {
    render(<Login />);

    expect(screen.getByTestId("email-input")).toBeTruthy();
    expect(screen.getByTestId("password-input")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Login" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Create Account" })).toBeTruthy();
  });

  it("disables login button when fields are empty", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  });

  it("enables login button when fields are filled", () => {
    render(<Login />);
    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).not.toBeDisabled();
  });

  it("calls signInWithEmailAndPassword on login button press", async () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<Login />);

    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");
    fireEvent.press(screen.getByRole("button", { name: "Login" }));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "test@example.com",
      "password123",
      { persistence: "SESSION" }
    );
  });

  it("navigates to Create Account on button press", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<Login />);
    fireEvent.press(screen.getByRole("button", { name: "Create Account" }));
    expect(mockNavigate).toHaveBeenCalledWith("CreateAccount");
  });
});
