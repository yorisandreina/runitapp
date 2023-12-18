import { StyleSheet } from "react-native/types";

export default StyleSheet.create({
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
