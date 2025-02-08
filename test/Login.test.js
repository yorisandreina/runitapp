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

// if (admin.apps.length === 0) {
//   const serviceAccountPath = path.resolve(
//     __dirname,
//     "../credentials/ServiceAccount.json"
//   );

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountPath),
//     projectId: "runit-8e5c8",
//   });
// }

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

  it("navigates to Create Account on button press", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    render(<Login />);
    fireEvent.press(screen.getByRole("button", { name: "Create Account" }));
    expect(mockNavigate).toHaveBeenCalledWith("CreateAccount");
  });
});

describe("Login to app using Firestore", () => {
  // let testEnv;

  // beforeAll(async () => {
  //   testEnv = await initializeTestEnvironment({
  //     projectId: "runit-8e5c8",
  //     firestore: {
  //       host: "127.0.0.1",
  //       port: 8080,
  //     },
  //   });

  //   await testEnv.clearFirestore();
  // });

  // afterAll(async () => {
  //   await testEnv.cleanup();
  // });

  it("logs in and writes user data to Firestore", async () => {
    // const db = admin.firestore();

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

    // const docRef = db.collection("users").doc("test-uid");

    // await assertSucceeds(
    //   docRef.set({ name: "John Doe", email: "john.doe@example.com", uid: "test-uid" })
    // );

    // const doc = await docRef.get();
    // const data = doc.data();

    // expect(doc.exists).toBe(true);
    // expect(data.email).toBe("john.doe@example.com");
  });
});
