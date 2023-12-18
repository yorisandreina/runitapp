import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig";
import { Image } from "react-native";
import { setDoc, doc } from "firebase/firestore";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

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
      Alert.alert("User account created successfully!");
      navigation.navigate("RaceDetails");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "/Users/andreina/runit/assets/logo.PNG" }}
        style={styles.logo}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.buttonSignup}>
        <Text style={styles.buttonTextSignup}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 20,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#322eb8",
    fontSize: 14,
  },
  buttonSignup: {
    marginTop: 20,
    padding: 15,
    width: "100%",
    backgroundColor: "#322EB0",
    borderRadius: 20,
  },
  buttonTextSignup: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default CreateAccount;