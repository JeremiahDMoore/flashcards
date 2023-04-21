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
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user data,", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 30 }}>Login {'\n'}</Text>

        <MyTextInput
          value={email}
          placeholder={"Email"}
          backgroundColor={"#fff"}
          onChange={(e) => {
            setEmail(e);
          }}
        />

        <MyTextInput
          value={password}
          placeholder={"Password"}
          onChange={(e) => {
            setPassword(e);
          }}
        />

        {errorMessage ? (
          <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
        ) : null}

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
