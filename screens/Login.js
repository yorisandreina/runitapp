import React, { useEffect, useState } from "react";
import { View, Alert, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Auth.styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredential] = useState(null);

  const navigation = useNavigation();
  const authLogin = getAuth();

  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    return () => {
      if (userCredential) {
        storeData(userCredential.user);
      }
    };
  }, []);

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