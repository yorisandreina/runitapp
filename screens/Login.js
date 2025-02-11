import React, { useEffect, useState } from "react";
import { View, Alert, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Auth.styles";

/**
 * Login screen component for user authentication.
 * Allows users to log in with email and password, or navigate to the account creation screen.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredential] = useState(null);

  const navigation = useNavigation();
  const authLogin = getAuth();

  /**
   * Validates if the login form is valid (both email and password are not empty).
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    return () => {
      if (userCredential) {
        storeData(userCredential.user);
      }
    };
  }, []);

  /**
   * Handles user login by authenticating with Firebase using email and password.
   * On successful login, navigates to the "Home" screen.
   * Displays an alert on error.
   */
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(authLogin, email, password, {
        persistence: "SESSION",
      });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Login Error",
        "The email and password you entered did not match our records."
      );
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
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
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
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
      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={!isFormValid()}
        style={[
          styles.button,
          { backgroundColor: isFormValid() ? "#322eb8" : "#c9c9c9" },
        ]}
        labelStyle={styles.buttonText}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={handleCreateAccount}
        style={styles.buttonSignup}
        labelStyle={styles.buttonTextSignup}
      >
        Create Account
      </Button>
    </View>
  );
};

export default Login;