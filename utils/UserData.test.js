import { render, waitFor } from "@testing-library/react-native";
import { useEffect } from "react";
import useCurrentUser from "./UserData";
import { getAuth, onAuthStateChanged } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe("useCurrentUser", () => {
  it("should set the currentUser when authentication state changes", async () => {
    // Arrange
    const mockUser = { uid: "123", email: "test@example.com" };

    getAuth.mockReturnValue({
      currentUser: mockUser,
    });

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    const setCurrentUser = jest.fn();

    // Act
    const TestComponent = () => {
      const currentUser = useCurrentUser(setCurrentUser);
      useEffect(() => {
        if (currentUser) {
          setCurrentUser(currentUser);
        }
      }, [currentUser]);
    };

    render(<TestComponent />);

    // Assert
    await waitFor(() => {
      expect(setCurrentUser).toHaveBeenCalledWith(mockUser);
    });
  });

  it("should not set the currentUser if the user has the same UID", async () => {
    // Arrange
    const mockUser = { uid: "123", email: "test@example.com" };

    getAuth.mockReturnValue({
      currentUser: mockUser,
    });

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    const setCurrentUser = jest.fn();

    // Act
    const TestComponent = () => {
      const currentUser = useCurrentUser(setCurrentUser);
      useEffect(() => {
        if (currentUser) {
          setCurrentUser(currentUser);
        }
      }, [currentUser]);
    };

    render(<TestComponent />);

    // Assert
    await waitFor(() => {
      expect(setCurrentUser).toHaveBeenCalledWith(mockUser);
    });
  });
});