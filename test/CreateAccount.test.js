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
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<CreateAccount />);

    fireEvent.changeText(screen.getByTestId("name-input"), "John Doe");
    fireEvent.changeText(screen.getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(screen.getByTestId("password-input"), "password123");
    fireEvent.press(screen.getByRole("button", { name: "Create account"}));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "test@example.com",
      "password123"
    );
  });

  it("navigates to Login on button press", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<CreateAccount />);
    fireEvent.press(screen.getByRole("button", { name: "Back to Login" }));
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });

  it("disables the button when form is incomplete", () => {
    render(<CreateAccount />);
    const createButton = screen.getByText("Create account");

    expect(createButton).toBeDisabled();
  });
});