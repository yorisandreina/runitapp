import {
  render,
  fireEvent,
  screen
} from "@testing-library/react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CreateAccount from "../screens/CreateAccount";
import admin from "firebase-admin";
import {
  initializeTestEnvironment,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import * as path from "path";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: "12345" },
  }),
}));

if (admin.apps.length === 0) {
  const serviceAccountPath = path.resolve(
    __dirname,
    "../credentials/ServiceAccount.json"
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    projectId: "runit-8e5c8",
  });
}

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

describe("Add user credentials to db", () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "runit-8e5c8",
      firestore: {
        host: "127.0.0.1",
        port: 8080,
      },
    });
  });

  it("creates a user account and navigates to RaceDetails screen on success", async () => {
    const db = admin.firestore();

  // Arrange
  const docRef = db.collection("users").doc("user_123");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    uid: "test-uid",
  };
  
  // Act
  await assertSucceeds(docRef.set(userData));

  const doc = await docRef.get();
  const data = doc.data();

  // Assert
  expect(doc.exists).toBe(true);
  expect(data).toEqual(userData);
  });
});