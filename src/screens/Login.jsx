import { useEffect, useState } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import MyBtn from "../components/MyBtn";
import MyTextInput from "../components/MyTextInput";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    // Using trim to remove leading and trailing whitespaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;
      console.log("user data,", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const handleLogin = async () => {
    // Using trim to remove leading and trailing whitespaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;
      console.log("user data,", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: "center", marginVertical: "40%" }}>
        <Text style={{ color: "#fff", fontSize: 30 }}>Welcome!</Text>
        <Text style={{ color: "#fff", fontSize: 25 }} >Please Log in or Sign up</Text>

        {errorMessage ? (
          <Text style={{ color: "yellow", marginTop: 10 }}>{errorMessage}</Text>
        ) : null }

        <MyTextInput
          value={email}
          placeholder={"Email"}
          backgroundColor={"#fff"}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <MyTextInput
          value={password}
          placeholder={"Password"}
          secureTextEntry // Setting this property to true will make the password show as dots
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        <View style={{ marginBottom: 20 }} />
        <MyBtn
          text={"Signup"}
          onPress={() => {
            handleSignup();
            console.log("*** SIGNED UP");
          }}
        />
        <View style={{ marginBottom: 20 }} />

        <MyBtn
          text={"Login"}
          onPress={() => {
            handleLogin();
            console.log("*** LOGGED IN");
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
