import React, { useState } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper"; // Import PaperProvider
import CompletedModal from "./CompletedModal";

// Mock handleMarkAsCompleted function
const mockHandleMarkAsCompleted = jest.fn();

describe("CompletedModal", () => {
  it("should render the modal elements when visible", () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(
      <PaperProvider>
        {" "}
        <CompletedModal
          visible={true}
          onDismiss={() => {}}
          finishTime="00:00:00"
          setFinishTime={() => {}}
          handleMarkAsCompleted={mockHandleMarkAsCompleted}
        />
      </PaperProvider>
    );

    // Assert
    expect(getByText("Input your finish time:")).toBeTruthy();
    expect(getByPlaceholderText("HH:MM:SS")).toBeTruthy();
    expect(getByText("Save Data")).toBeTruthy();
  });

  it("should update the finish time input", () => {
    // Arrange
    const setFinishTimeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <PaperProvider>
        <CompletedModal
          visible={true}
          onDismiss={() => {}}
          finishTime="00:00:00"
          setFinishTime={setFinishTimeMock}
          handleMarkAsCompleted={mockHandleMarkAsCompleted}
        />
      </PaperProvider>
    );

    // Act
    const input = getByPlaceholderText("HH:MM:SS");
    fireEvent.changeText(input, "01:23:45");

    // Assert
    expect(setFinishTimeMock).toHaveBeenCalledWith("01:23:45");
    expect(setFinishTimeMock).toHaveBeenCalledTimes(1);
  });

  it("should call handleMarkAsCompleted when Save Data button is pressed", () => {
    // Arrange
    const { getByText } = render(
      <PaperProvider>
        <CompletedModal
          visible={true}
          onDismiss={() => {}}
          finishTime="00:00:00"
          setFinishTime={() => {}}
          handleMarkAsCompleted={mockHandleMarkAsCompleted}
        />
      </PaperProvider>
    );

    // Act
    const button = getByText("Save Data");
    fireEvent.press(button);

    // Assert
    expect(mockHandleMarkAsCompleted).toHaveBeenCalled();
  });

  it("should not render modal elements when not visible", async () => {
    // Arrange
    const { queryByText, queryByPlaceholderText } = render(
      <PaperProvider>
        <CompletedModal
          visible={false}
          onDismiss={() => {}}
          finishTime="00:00:00"
          setFinishTime={() => {}}
          handleMarkAsCompleted={mockHandleMarkAsCompleted}
        />
      </PaperProvider>
    );

    // Assert
    await waitFor(() => {
      expect(queryByText("Input your finish time:")).toBeNull();
      expect(queryByPlaceholderText("HH:MM:SS")).toBeNull();
      expect(queryByText("Save Data")).toBeNull();
    });
  });
});
