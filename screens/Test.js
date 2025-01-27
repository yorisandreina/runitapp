import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Modal, Portal, Provider as PaperProvider } from "react-native-paper";

const Test = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button title="Show Modal" onPress={() => setModalVisible(true)} />
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalBox}
          >
            <Text style={styles.modalText}>This is a simple modal!</Text>
            <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            />
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Test;
