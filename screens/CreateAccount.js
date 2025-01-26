import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
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

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const isFormValid = () => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  };

  const handleSignUp = async () => {
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
      Alert.alert("Unable to process request, please try again.");
    }
  };

  const handleGoBack = async () => {
    navigation.navigate('Login');
  }

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
        value={email}
        onChangeText={(text) => setName(text)}
        autoCapitalize="none"
        keyboardType="text"
        mode="outlined"
        style={styles.input}
        outlineColor="#c9c9c9"
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
      />
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
        Sign Up
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