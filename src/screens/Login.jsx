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

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user data,", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user data,", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
      <Text>Login Screen</Text>

      <MyTextInput
        value={email}
        placeholder={"Email"}
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
      <View style={{ marginBottom: 20 }} />
      <MyBtn
        text={"Signup"}
        onPress={() => {
          handleSignup();
          console.log('*** SIGNED UP')
        }}
      />
      <View style={{ marginBottom: 20 }} />

      <MyBtn
        text={"Login"}
        onPress={() => {
          handleLogin();
          console.log('*** LOGGED IN')
        }}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}
