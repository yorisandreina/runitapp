import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import styles from "../styles/Home.styles";

/**
 * `CompletedModal` component for marking a workout as completed.
 *
 * This modal allows the user to input their finish time and save the data.
 * It includes a text input field for entering the finish time and a button to submit the data.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {Function} props.onDismiss - Function to close the modal.
 * @param {string} props.finishTime - The finish time input value.
 * @param {Function} props.setFinishTime - Function to update the finish time state.
 * @param {Function} props.handleMarkAsCompleted - Function to handle saving the completion data.
 *
 * @returns {JSX.Element} A modal with a text input for finish time and a save button.
 */
const CompletedModal = ({
  visible,
  onDismiss,
  finishTime,
  setFinishTime,
  handleMarkAsCompleted,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainerCompleted}
        testID="completed-modal"
      >
        <View>
          <Text>Input your finish time:</Text>
          <TextInput
            label="Finish Time"
            value={finishTime}
            onChangeText={setFinishTime}
            mode="outlined"
            placeholder="HH:MM:SS"
            style={styles.textInput}
          />
          <Button
            mode="contained"
            onPress={handleMarkAsCompleted}
            style={styles.saveButton}
          >
            Save Data
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CompletedModal;
