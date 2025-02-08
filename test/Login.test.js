import { render, fireEvent, screen } from "@testing-library/react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "../screens/Login";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: { uid: "test-uid" } }),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: { uid: "test-uid", email: "john.doe@example.com" },
    })
  ),
}));

describe("Login Component", () => {
  it("renders input fields and buttons", () => {
    // Arrange
    render(<Login />);

    // Assert
    expect(screen.getByTestId("email-input")).toBeTruthy();
    expect(screen.getByTestId("password-input")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Login" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Create Account" })).toBeTruthy();
  });

  it("disables login button when fields are empty", () => {
    // Arrange
    render(<Login />);

    // Act
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Assert
    expect(loginButton).toBeDisabled();
  });

  it("enables login button when fields are filled", () => {
    // Arrange
    render(<Login />);

    // Act
    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");

    const loginButton = screen.getByRole("button", { name: "Login" });

    // Assert
    expect(loginButton).not.toBeDisabled();
  });

  it("navigates to Create Account on button press", () => {
    // Arrange
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<Login />);

    // Act
    fireEvent.press(screen.getByRole("button", { name: "Create Account" }));

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("CreateAccount");
  });
});

describe("Login to app using Firestore", () => {
  it("logs in and writes user data to Firestore", async () => {

    // Arrange
    render(<Login />);

    // Act
    fireEvent.changeText(screen.getByTestId("email-input"), "john.doe@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");

    fireEvent.press(screen.getByRole("button", { name: "Login" }));

    // Assert
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "john.doe@example.com",
      "password123",
      { persistence: "SESSION" }
    );
  });
});
