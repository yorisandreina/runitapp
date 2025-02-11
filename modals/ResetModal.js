import React from "react";
import { View } from "react-native";
import { Modal, Portal, Button, Icon } from "react-native-paper";
import styles from "../styles/Home.styles";

/**
 * `ResetModal` component for displaying user action options.
 *
 * This modal provides options for viewing achievements, resetting race details, and logging out.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {Function} props.onDismiss - Function to close the modal.
 * @param {Object} props.navigation - React Navigation object for handling navigation.
 * @param {Function} props.handleLogout - Function to handle user logout.
 *
 * @returns {JSX.Element} A modal with buttons for achievements, resetting marks, and logging out.
 */
const ResetModal = ({ visible, onDismiss, navigation, handleLogout }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalItem}>
            <Icon source="trophy" color="#322eb8" size={22} />
            <Button
              mode="text"
              textColor="black"
              onPress={() => navigation.navigate("MyAchievements")}
            >
              My Achievements
            </Button>
          </View>
          <View style={styles.modalItem}>
            <Icon source="square-edit-outline" color="#322eb8" size={22} />
            <Button
              mode="text"
              textColor="black"
              onPress={() => navigation.navigate("RaceDetails")}
            >
              Reset Marks
            </Button>
          </View>
          <View style={styles.modalItem}>
            <Icon source="logout" color="#322eb8" size={22} />
            <Button mode="text" textColor="black" onPress={handleLogout}>
              Logout
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ResetModal;
