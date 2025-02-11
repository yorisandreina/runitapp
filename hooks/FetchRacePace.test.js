import { renderHook, act } from "@testing-library/react-native";
import useFetchRacePace from "./FetchRacePace";
import { onSnapshot } from "firebase/firestore";
import useCurrentUser from "../hooks/UserData";

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("../hooks/UserData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useFetchRacePace", () => {
  const mockUser = { uid: "12345" };
  const mockRacePace = "7:30";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return race pace from Firestore when user is available", async () => {
    // Arrange
    useCurrentUser.mockReturnValue(mockUser);

    const unsubscribe = jest.fn();
    onSnapshot.mockImplementationOnce((docRef, callback) => {
      callback({
        exists: () => true,
        data: () => ({ racePace: mockRacePace }),
      });

      return unsubscribe;
    });

    // Act
    const { result } = renderHook(() => useFetchRacePace());

    await act(async () => {});

    // Assert
    expect(result.current).toBe(mockRacePace);
  });

  it("should return an empty string when there is no current user", () => {
    // Arrange
    useCurrentUser.mockReturnValue(null);

    // Act
    const { result } = renderHook(() => useFetchRacePace());

    // Assert
    expect(result.current).toBe("");
  });

  it("should not call Firestore if there is no current user", () => {
    // Arrange
    useCurrentUser.mockReturnValue(null);

    // Act
    renderHook(() => useFetchRacePace());

    // Assert
    expect(onSnapshot).not.toHaveBeenCalled();
  });
});
