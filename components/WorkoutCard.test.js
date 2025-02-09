import React from "react";
import { render } from "@testing-library/react-native";
import WorkoutCard from "./WorkoutCard";
import { Text } from "react-native-paper";

describe("WorkoutCard", () => {
  const mockWorkouts = [
    { id: "1", name: "Workout A" },
    { id: "2", name: "Workout B" },
  ];

  const mockRenderItem = ({ item }) => <Text>{item.name}</Text>;

  it("renders the title correctly", () => {
    // Arrange
    const { getByText } = render(
      <WorkoutCard
        title="Test Workout"
        loading={false}
        workouts={[]}
        renderItem={mockRenderItem}
      />
    );

    // Assert
    expect(getByText("Test Workout")).toBeTruthy();
  });

  it("shows loading indicator when loading is true", () => {
    // Arrange
    const { getByTestId } = render(
      <WorkoutCard
        title="Test Workout"
        loading={true}
        workouts={[]}
        renderItem={mockRenderItem}
      />
    );

    // Assert
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders workout items when loading is false", () => {
    // Arrange
    const { getByText } = render(
      <WorkoutCard
        title="Test Workout"
        loading={false}
        workouts={mockWorkouts}
        renderItem={mockRenderItem}
      />
    );

    // Assert
    expect(getByText("Workout A")).toBeTruthy();
    expect(getByText("Workout B")).toBeTruthy();
  });

  it("does not show workouts when loading is true", () => {
    // Arrange
    const { queryByText } = render(
      <WorkoutCard
        title="Test Workout"
        loading={true}
        workouts={mockWorkouts}
        renderItem={mockRenderItem}
      />
    );

    // Assert
    expect(queryByText("Workout A")).toBeNull();
    expect(queryByText("Workout B")).toBeNull();
  });
});
