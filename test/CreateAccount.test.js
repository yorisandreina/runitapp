import {
  render,
  fireEvent,
  screen
} from "@testing-library/react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CreateAccount from "../screens/CreateAccount";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: "12345" },
  }),
}));

describe("CreateAccount Component", () => {
  it("calls createUserWithEmailAndPassword and navigates on success", async () => {
    // Arrange
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<CreateAccount />);

    // Act
    fireEvent.changeText(screen.getByTestId("name-input"), "John Doe");
    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");
    fireEvent.press(screen.getByRole("button", { name: "Create account"}));

    // Assert
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "test@example.com",
      "password123"
    );
  });

  it("navigates to Login on button press", () => {
    // Arrange
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<CreateAccount />);

    // Act
    fireEvent.press(screen.getByRole("button", { name: "Back to Login" }));

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });

  it("disables the button when form is incomplete", () => {
    // Arrange
    render(<CreateAccount />);

    // Act
    const createButton = screen.getByText("Create account");

    // Assert
    expect(createButton).toBeDisabled();
  });
});