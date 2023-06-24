import React from "react";
import { TextInput } from "react-native";

function MyTextInput({ value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#f0f0f0",
        width: "80%",
        borderRadius: 999,
        padding: 10,
        margin: 6,
      }}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry} // Secure text entry for password inputs
      onChangeText={onChangeText} // Handler for text changes

      // onChangeText={(e) => {
      //   onChange(e);
      // }}
    />
  );
}

export default MyTextInput;
