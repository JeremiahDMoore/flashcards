import { View, Text } from "react-native";
import MyBtn from "../components/MyBtn";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export default function HomeScreen({ navigation }) {
  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <View style={{ marginBottom: 20 }} />

      <MyBtn
        text={"Log out"}
        onPress={() => {
          signOut();
          console.log('LOGGED OUT')
        }}
      />
    </View>
  );
}
