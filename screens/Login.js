import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredential] = useState(null);

  const navigation = useNavigation();
  const authLogin = getAuth();

  useEffect(() => {
    return () => {
      if (userCredential) {
        storeData(userCredential.user);
      }
    };
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authLogin,
        email,
        password,
        {
          persistence: "SESSION",
        });
      const user = userCredential.user;
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "/Users/andreina/app/assets/logo.PNG" }}
        style={styles.logo}
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
      <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
        <Text style={styles.buttonTextLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={styles.buttonSignup}
      >
        <Text style={styles.buttonTextSignup}>Create account</Text>
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
  buttonLogin: {
    marginTop: 20,
    padding: 15,
    width: "100%",
    backgroundColor: "#322EB0",
    borderRadius: 20,
  },
  buttonSignup: {
    marginTop: 20,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  buttonTextLogin: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSignup: {
    color: "#322EB0",
    textAlign: "center",
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Login;