import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import styles from "../styles/Home.styles";

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
