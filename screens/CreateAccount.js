import React, { useState } from "react";
import {
  View,
  Alert,
} from "react-native";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig";
import { Image } from "react-native";
import { setDoc, doc } from "firebase/firestore";
import styles from "../styles/Auth.styles";
import { TextInput, Button, Text } from "react-native-paper";

/**
 * `CreateAccount` Screen
 *
 * This screen allows users to create an account using their name, email, and password.
 * Upon successful account creation, the user is navigated to the "RaceDetails" screen.
 *
 * @returns {JSX.Element} A screen for user registration.
 */
const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  /**
   * Validates if the form is correctly filled.
   * @returns {boolean} Returns true if all fields are filled, otherwise false.
   */
  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  };

  /**
   * Handles user registration using Firebase Authentication.
   * If successful, stores user data in Firestore and navigates to "RaceDetails".
   * Displays an alert in case of an error.
   */
  const handleSignUp = async () => {
    if (password.length < 6) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = doc(db, "users", user.uid);

      await setDoc(userDoc, {
        name: name,
        email: email,
        uid: user.uid,
      });
      Alert.alert("Account created successfully!");
      navigation.navigate("RaceDetails");
    } catch (error) {
      console.error(error);
      Alert.alert("Unable to process request, please try again.");
    }
  };

  const handleGoBack = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/yorisandreina/runitapp/main/logo.PNG",
        }}
        style={styles.logo}
      />
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="text"
        mode="outlined"
        style={styles.input}
        outlineColor="#c9c9c9"
        testID="name-input"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
        style={styles.input}
        outlineColor="#c9c9c9"
        testID="email-input"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        mode="outlined"
        style={styles.input}
        outlineColor="#c9c9c9"
        testID="password-input"
      />
      <Text style={styles.password}>
        *Password must be at least 6 characters long.
      </Text>
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={[
          styles.button,
          { backgroundColor: isFormValid() ? "#322eb8" : "#c9c9c9" },
        ]}
        disabled={!isFormValid()}
        labelStyle={styles.buttonText}
      >
        Create account
      </Button>
      <Button
        mode="contained"
        onPress={handleGoBack}
        style={styles.buttonSignup}
        labelStyle={styles.buttonTextSignup}
      >
        Back to Login
      </Button>
    </View>
  );
};

export default CreateAccount;