import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginVertical: 5,
    width: "100%",
    fontSize: 14,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    padding: 5,
    width: "100%",
    backgroundColor: "#322EB0",
    borderRadius: 5,
  },
  buttonSignup: {
    marginTop: 15,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSignup: {
    color: "#322EB0",
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  logo: {
    width: 100,
    height: 100,
  },
  password: {
    color: "rgba(135, 135, 135, 0.8)",
  },
});

export default styles;
