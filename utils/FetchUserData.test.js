import { renderHook, act } from "@testing-library/react-native";
import useFetchUserData from "./FetchUserData";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

// Mocking Firebase and auth
jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  auth: {
    currentUser: {
      uid: "test-uid",
    },
  },
}));

describe("useFetchUserData", () => {
  const mockNavigation = {
    addListener: jest.fn(),
  };

  it("should fetch user data when navigation is focused", async () => {
    // Arrange
    const mockUserData = {
      name: "Test User",
      email: "testuser@example.com",
    };

    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => mockUserData,
    });

    mockNavigation.addListener.mockImplementationOnce((event, callback) => {
      if (event === "focus") callback();
    });

    // Act
    const { result } = renderHook(() =>
      useFetchUserData(mockNavigation)
    );

    await act(async () => {});

    // Assert
    expect(result.current).toEqual(mockUserData);
    expect(getDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(db, "users", "test-uid");
  });

  it("should return null if no user is logged in", async () => {
    // Arrange
    auth.currentUser = null;

    mockNavigation.addListener.mockImplementationOnce((event, callback) => {
      if (event === "focus") callback();
    });

    // Act
    const { result } = renderHook(() => useFetchUserData(mockNavigation));

    // Assert
    expect(result.current).toBeNull();
  });
});
