import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RaceDetails from "../screens/RaceDetails";
import admin from "firebase-admin";
import {
  initializeTestEnvironment,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import * as path from "path";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
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

describe("RaceDetails Component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<RaceDetails />);

    // Check if the title and input fields are rendered
    expect(getByText("Enter your race details")).toBeTruthy();
    expect(getByTestId("race-name-input")).toBeTruthy();
    expect(getByText("Race date")).toBeTruthy();
    expect(getByText("Race distance")).toBeTruthy();
    expect(getByText("Goal pace")).toBeTruthy();
  });

  it("updates race name when input changes", () => {
    const { getByTestId } = render(<RaceDetails />);
    const raceNameInput = getByTestId("race-name-input");

    fireEvent.changeText(raceNameInput, "Marathon");
    expect(raceNameInput.props.value).toBe("Marathon");
  });
});

describe("Add race details to existing user doc", () => {
  let testEnv;

  beforeAll(async () => {
    // Initialize Firebase Test Environment
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

    const raceDetailsData = {
      raceDate: "2025-05-18",
      raceDistance: "42km",
      raceName: "Amsterdam Marathon",
      racePace: "05:10",
    };

    // Act
    await assertSucceeds(docRef.update(raceDetailsData));

    const doc = await docRef.get();
    const data = doc.data();

    // Assert
    expect(doc.exists).toBe(true);
    expect(data).toEqual({
      ...userData,
      ...raceDetailsData,
    });
  });
});
